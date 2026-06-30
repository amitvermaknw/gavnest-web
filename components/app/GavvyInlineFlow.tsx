'use client'

import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'

type Question = {
  question_id: string
  label:       string
  helper:      string | null
  input_type:  'currency' | 'number' | 'choice' | 'text'
  placeholder: string | null
  choices:     string[] | null
  progress:    { current: number; total: number }
}

type Summary = {
  true_budget:       string
  dti:               string
  estimated_payment: number
  verdict:           string
  summary:           string
}

export default function GavvyInlineFlow({
  phaseId,
  onComplete,
}: {
  phaseId:     string
  onComplete?: () => void
}) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [summary,  setSummary]  = useState<Summary | null>(null)
  const [answers,  setAnswers]  = useState<Record<string, any>>({})
  const [value,    setValue]    = useState('')
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  useEffect(() => { fetchNextStep() }, [])

  async function fetchNextStep(updatedAnswers = answers) {
    setLoading(true)
    setError(null)
    try {
      const token = await auth.currentUser!.getIdToken()
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GAVVY_AGENT_URL}/api/v1/journey/next-step`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body:    JSON.stringify({ phase_id: phaseId, answers: updatedAnswers }),
        }
      )
      if (!res.ok) throw new Error(`Backend error: ${res.status}`)
      const data = await res.json()
      if (data.done) {
        setSummary(data.summary)
        setQuestion(null)
      } else {
        setQuestion(data)
      }
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit() {
    if (!question) return
    let parsed: any = value
    if (question.input_type === 'currency' || question.input_type === 'number') {
      parsed = parseFloat(value.replace(/[^\d.]/g, ''))
      if (isNaN(parsed) || parsed < 0) { setError('Please enter a valid number'); return }
    }
    if (question.input_type === 'choice' && !value) {
      setError('Please pick an option'); return
    }
    const updated = { ...answers, [question.question_id]: parsed }
    setAnswers(updated)
    setValue('')
    fetchNextStep(updated)
  }

  function handleContinue() {
    if (onComplete) onComplete()
    else window.location.reload()
  }

  // LOADING STATE
  if (loading && !question && !summary) {
    return (
      <div className="rounded-2xl bg-white border border-cream-200 p-8 flex items-center justify-center">
        <div className="flex items-center gap-3">
          {[0, 150, 300].map(d => (
            <span key={d} className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"
                  style={{ animationDelay: `${d}ms` }} />
          ))}
          <span className="text-sm text-bark-700/60 font-body ml-2">Gavvy is thinking…</span>
        </div>
      </div>
    )
  }

  // SUMMARY VIEW
  if (summary) {
    return (
      <div className="rounded-2xl bg-white border border-cream-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-display font-bold text-white">G</span>
          </div>
          <div>
            <div className="text-xs font-display font-bold text-teal-600 uppercase tracking-widest mb-1">
              Your readiness check
            </div>
            <h3 className="text-lg font-display font-bold text-bark-900">
              {summary.verdict === 'ready'
                ? "You're ready to start house hunting."
                : "You're close — here's what to focus on."}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-cream-50 border border-cream-200 p-4">
            <div className="text-[10px] font-display font-bold text-bark-700/40 uppercase tracking-widest mb-1">True budget</div>
            <div className="text-xl font-display font-extrabold text-bark-900">{summary.true_budget}</div>
          </div>
          <div className="rounded-xl bg-cream-50 border border-cream-200 p-4">
            <div className="text-[10px] font-display font-bold text-bark-700/40 uppercase tracking-widest mb-1">DTI</div>
            <div className="text-xl font-display font-extrabold text-bark-900">{summary.dti}</div>
          </div>
          <div className="rounded-xl bg-cream-50 border border-cream-200 p-4">
            <div className="text-[10px] font-display font-bold text-bark-700/40 uppercase tracking-widest mb-1">Est. payment</div>
            <div className="text-xl font-display font-extrabold text-bark-900">${summary.estimated_payment}/mo</div>
          </div>
        </div>

        <p className="text-sm font-body text-bark-700 leading-relaxed mb-6">
          {summary.summary}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleContinue} className="btn-primary">
            Continue to pre-approval →
          </button>
        </div>
      </div>
    )
  }

  // QUESTION VIEW
  if (!question) return null

  return (
    <div className="rounded-2xl bg-white border border-cream-200 p-6 md:p-8 shadow-sm">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-display font-bold text-white">G</span>
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-display font-bold text-teal-600 uppercase tracking-widest mb-1">
            Gavvy · Question {question.progress.current} of {question.progress.total}
          </div>
          <h3 className="text-base md:text-lg font-display font-semibold text-bark-900 leading-snug">
            {question.label}
          </h3>
          {question.helper && (
            <p className="text-xs font-body text-bark-700/60 mt-1">{question.helper}</p>
          )}
        </div>
      </div>

      <div className="md:ml-12">
        {question.input_type === 'currency' && (
          <div className="relative max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bark-700/40 font-body">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(null) }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder={question.placeholder ?? ''}
              autoFocus
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-cream-200
                         bg-cream-50 text-base font-body text-bark-900
                         focus:outline-none focus:ring-2 focus:ring-teal-500/40
                         focus:border-teal-500"
            />
          </div>
        )}

        {question.input_type === 'choice' && (
          <div className="flex flex-col gap-2 max-w-md">
            {question.choices?.map((c) => (
              <button
                key={c}
                onClick={() => setValue(c)}
                className={`text-left px-4 py-3 rounded-xl border transition-all font-body text-sm ${
                  value === c
                    ? 'border-teal-500 bg-teal-500/5 text-teal-700'
                    : 'border-cream-200 bg-cream-50 text-bark-700 hover:border-teal-500/40'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {error && <p className="text-xs text-red-600 mt-2 font-body">{error}</p>}

        <div className="flex items-center justify-between mt-5">
          <button onClick={handleSubmit} disabled={loading || !value} className="btn-primary">
            {loading ? 'Saving…' : 'Continue →'}
          </button>

          <div className="flex items-center gap-2 text-xs font-body text-bark-700/40">
            <div className="w-24 h-1 rounded-full bg-cream-200 overflow-hidden">
              <div
                className="h-1 bg-teal-500 transition-all duration-300"
                style={{ width: `${(question.progress.current / question.progress.total) * 100}%` }}
              />
            </div>
            <span>{question.progress.current}/{question.progress.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
