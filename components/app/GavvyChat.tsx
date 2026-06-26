'use client'

import { useRef, useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'
import type { UserProfile } from '@/lib/firestore'

type Message = {
  id: string
  role: 'user' | 'gavvy'
  content: string
  streaming?: boolean
}

export default function GavvyChat({
  isOpen,
  onClose,
  currentPhase,
  prefillMessage,
  userProfile
}: {
  isOpen: boolean
  onClose: () => void
  currentPhase: number
  prefillMessage?: string | null
  userProfile: UserProfile
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Phase number → phase_id string mapping
  const PHASE_ID_MAP: Record<number, string> = {
    1: 'readiness',
    2: 'mortgage',
    3: 'property',
    4: 'contract',
    5: 'contract',
    6: 'closing',
  }

  // Phase 1 suggestions map — what to offer after Gavvy's first response
  const PHASE_SUGGESTIONS: Record<string, string[]> = {
    readiness: [
      "My gross monthly income is $___",
      "What's my estimated monthly payment?",
      "What credit score do I need to qualify?",
      "How much should I save before buying?",
    ],
    mortgage: [
      "What rate can I expect with my credit score?",
      "Compare 15-year vs 30-year for my budget",
      "How do I get pre-approved?",
      "What documents do lenders need?",
    ],
    property: [
      "Analyze the HOA docs I uploaded",
      "Check flood zone for this address",
      "What should I look for at a showing?",
      "Is this listing price fair?",
    ],
    contract: [
      "Review my purchase agreement",
      "What contingencies should I include?",
      "How long does closing take?",
      "What are my closing costs?",
    ],
  }

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && prefillMessage && messages.length === 0) {
      // Auto-send the prefill message as if user typed it
      sendMessage(prefillMessage)
    }
  }, [isOpen, prefillMessage])

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`
    }
  }

  async function sendMessage(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || streaming) return

    const user = auth.currentUser
    if (!user) return

    // 1. Add user message to state immediately
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setStreaming(true)

    // 2. Add empty Gavvy message placeholder that will be filled by stream
    const gavvyId = (Date.now() + 1).toString()
    setMessages((prev) => [...prev, { id: gavvyId, role: 'gavvy', content: '', streaming: true }])

    try {
      // 3. Get Firebase ID token
      const token = await user.getIdToken()

      // 4. POST to backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_GAVVY_AGENT_URL}/api/v1/gavvy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: text,
          phase_id: PHASE_ID_MAP[currentPhase] ?? 'readiness',
          user_profile: userProfile ?? {},   // pass from dashboard props
        }),
      })

      if (!res.ok) throw new Error(`Backend error: ${res.status}`)
      if (!res.body) throw new Error('No response body')

      // 5. Read SSE stream
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const jsonStr = line.slice(6).trim()
          if (!jsonStr) continue

          try {
            const event = JSON.parse(jsonStr)

            if (event.type === 'token') {
              // Append token to the streaming Gavvy message
              setMessages((prev) =>
                prev.map((m) => (m.id === gavvyId ? { ...m, content: m.content + event.content } : m))
              )
            }

            if (event.type === 'done') {
              // Mark streaming as complete
              setMessages((prev) => prev.map((m) => (m.id === gavvyId ? { ...m, streaming: false } : m)))
              setStreaming(false)
              // Show suggested replies for the phase Gavvy just responded in
              const phaseKey = PHASE_ID_MAP[currentPhase] ?? 'readiness'
              setSuggestions(PHASE_SUGGESTIONS[phaseKey] ?? [])
            }

            if (event.type === 'error') {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === gavvyId
                    ? { ...m, content: 'Something went wrong. Please try again.', streaming: false }
                    : m
                )
              )
              setStreaming(false)
            }
          } catch {
            // Skip malformed JSON lines
          }
        }
      }
    } catch (err) {
      console.error('Gavvy chat error:', err)
      setMessages((prev) =>
        prev.map((m) =>
          m.id === gavvyId
            ? { ...m, content: 'Could not reach Gavvy. Check your connection.', streaming: false }
            : m
        )
      )
      setStreaming(false)
    }
  }

  // Send on Enter key (Shift+Enter for newline)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div aria-hidden onClick={onClose} className="fixed inset-0 bg-bark-900/40 z-40" />

      <div
        role="dialog"
        aria-label="Chat with Gavvy"
        className="fixed z-50 bg-cream-50 shadow-2xl shadow-bark-900/20 flex flex-col
          bottom-0 left-0 right-0 h-[70vh] rounded-t-2xl
          md:top-0 md:right-0 md:left-auto md:bottom-0 md:h-full md:w-[400px] md:rounded-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/30">
              <svg className="w-4 h-4 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
              </svg>
            </div>
            <span className="font-display font-bold text-bark-900">Gavvy</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-cream-200 transition-colors text-bark-600"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.length === 0 && (
            <p className="font-body text-sm text-bark-600">
              Ask me anything about your home search — budgets, HOA fees, flood zones, contracts.
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-sm whitespace-pre-wrap ${msg.role === 'user'
                ? 'self-end bg-teal-500 text-cream-50'
                : 'self-start bg-white border border-cream-200 text-bark-800'
                }`}
            >
              {msg.role === 'gavvy' && msg.streaming && msg.content === '' ? <TypingDots /> : msg.content}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Suggested replies — shown after Gavvy responds */}
        {suggestions.length > 0 && !streaming && (
          <div className="px-4 pb-3 flex flex-col gap-2">
            <p className="text-[10px] font-display font-semibold text-bark-700/40 uppercase tracking-widest">
              Suggested replies
            </p>
            <div className="flex flex-col gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSuggestions([])   // hide after tap
                    sendMessage(s)       // send as user message
                  }}
                  className="text-left text-xs font-body text-teal-700 bg-teal-500/5
                     border border-teal-500/20 rounded-xl px-3.5 py-2.5
                     hover:bg-teal-500/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-5 py-4 border-t border-cream-200 flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Message Gavvy…"
            disabled={streaming}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-bark-800/15 bg-white px-4 py-2.5 font-body text-sm text-bark-800 placeholder:text-bark-600/60 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-60"
          />
          <button
            onClick={() => sendMessage()}
            disabled={streaming || !input.trim()}
            className="btn-primary px-4 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {streaming ? <span className="w-4 h-4 rounded-full border-2 border-cream-50/40 border-t-cream-50 animate-spin" /> : 'Send'}
          </button>
        </div>
      </div>
    </>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-bark-600/50 animate-pulse" />
      <span className="w-1.5 h-1.5 rounded-full bg-bark-600/50 animate-pulse animate-delay-100" />
      <span className="w-1.5 h-1.5 rounded-full bg-bark-600/50 animate-pulse animate-delay-200" />
    </span>
  )
}
