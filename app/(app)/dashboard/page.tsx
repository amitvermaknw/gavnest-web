'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import {
  getUserProfile,
  getPhaseData,
  subscribeToActions,
  toggleAction,
  subscribeToLatestInsight,
  type UserProfile,
  type PhaseData,
  type Phase,
  type Action,
  type Insight,
} from '@/lib/firestore'
import GavvyChat from '@/components/app/GavvyChat'

/* ─── static product copy (not user data) ────────────────── */

const phaseDescriptions: Record<number, string> = {
  1: 'Lets see where you stand financially before you start looking.',
  2: 'Lock in your rate and know exactly what you can borrow.',
  3: 'We will help you evaluate every listing against your real numbers — not just the asking price. HOA fees, flood zones, and hidden costs included.',
  4: 'Craft a competitive offer backed by your true numbers.',
  5: 'Stay on top of deadlines and contingencies until closing.',
  6: 'Final steps before the keys are yours.',
}

const tools = [
  { name: 'HOA analyzer', description: 'Upload HOA docs and get a plain-English breakdown of fees, rules, and red flags.' },
  { name: 'Inspection estimator', description: 'Estimate repair costs before you waive your inspection contingency.' },
  { name: 'Flood zone checker', description: 'Check FEMA flood zone status and estimate added insurance costs.' },
  { name: 'Comparable sales', description: 'See what similar homes nearby actually sold for, not just list price.' },
]

/* ─── helpers ─────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-xs font-bold tracking-wider text-bark-600/70 uppercase mb-4">
      {children}
    </p>
  )
}

function PhaseCircle({ state, num }: { state: Phase['state']; num: number }) {
  if (state === 'done') {
    return (
      <span className="w-7 h-7 shrink-0 rounded-full bg-teal-500 text-cream-50 flex items-center justify-center text-xs font-display font-bold">
        ✓
      </span>
    )
  }
  if (state === 'active') {
    return (
      <span className="w-7 h-7 shrink-0 rounded-full border-2 border-teal-500 text-teal-600 flex items-center justify-center text-xs font-display font-bold">
        {num}
      </span>
    )
  }
  return (
    <span className="w-7 h-7 shrink-0 rounded-full bg-cream-200 text-bark-600 flex items-center justify-center text-xs font-display font-bold">
      {num}
    </span>
  )
}

function ActionItem({ action, onToggle }: { action: Action; onToggle: () => void }) {
  return (
    <label className="flex items-start gap-3 bg-white rounded-2xl border border-cream-200 px-5 py-4 cursor-pointer hover:border-teal-500/40 transition-colors">
      <input
        type="checkbox"
        checked={action.completed}
        onChange={onToggle}
        className="mt-1 w-4 h-4 accent-teal-500 rounded shrink-0"
      />
      <div className="flex-1">
        <p
          className={`font-display text-sm font-bold ${action.completed ? 'text-bark-600/70 line-through' : 'text-bark-900'
            }`}
        >
          {action.title}
        </p>
        <p className="font-body text-sm text-bark-600 mt-0.5">{action.description}</p>
        {action.urgency && (
          <p className="font-body text-xs font-semibold text-gold-600 mt-1.5">⚠ {action.urgency}</p>
        )}
      </div>
    </label>
  )
}

function ToolCard({ name, description }: { name: string; description: string }) {
  return (
    <button className="text-left bg-white rounded-2xl border border-cream-200 px-5 py-4 hover:border-teal-500/40 transition-colors">
      <p className="font-display text-sm font-bold text-bark-900 mb-1">{name}</p>
      <p className="font-body text-sm text-bark-600">{description}</p>
    </button>
  )
}

function DashboardSkeleton() {
  return (
    <div className="md:flex animate-pulse">
      <aside className="md:w-[200px] md:fixed md:inset-y-0 md:left-0 bg-white border-b md:border-b-0 md:border-r border-cream-200 px-5 py-6 md:py-8">
        <div className="h-3 w-24 bg-cream-200 rounded mb-4" />
        <div className="flex flex-col gap-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-7 bg-cream-200 rounded-xl" />
          ))}
        </div>
        <div className="h-px bg-cream-200 mb-6" />
        <div className="h-3 w-24 bg-cream-200 rounded mb-4" />
        <div className="flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-cream-200 rounded" />
          ))}
        </div>
      </aside>
      <main className="flex-1 md:ml-[200px] px-5 md:px-10 py-8 md:py-10 max-w-5xl">
        <div className="h-3 w-20 bg-cream-200 rounded mb-3" />
        <div className="h-7 w-72 bg-cream-200 rounded mb-3" />
        <div className="h-4 w-full max-w-md bg-cream-200 rounded mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-cream-200 rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  )
}

/* ─── page ────────────────────────────────────────────────── */

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [chatOpen, setChatOpen] = useState(false)

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [phaseData, setPhaseData] = useState<PhaseData | null>(null)
  const [actions, setActions] = useState<Action[]>([])
  const [insight, setInsight] = useState<Insight | null>(null)
  const [dataLoading, setDataLoading] = useState(true)
  const [chatPrefill, setChatPrefill] = useState<string | null>(null)
  const [actionsJustLoaded, setActionsJustLoaded] = useState(false)
  const currentPhase = phaseData?.currentPhase ?? null

  function openGavvyChat(prefillMessage?: string) {
    setChatPrefill(prefillMessage ?? null)
    setChatOpen(true)
  }

  useEffect(() => {
    if (!user) return
    let active = true
    setDataLoading(true)

    Promise.all([getUserProfile(user.uid), getPhaseData(user.uid)]).then(
      ([userProfile, userPhaseData]) => {
        if (!active) return
        if (!userProfile) {
          router.replace('/onboarding')
          return
        }
        setProfile(userProfile)
        setPhaseData(userPhaseData)
        setDataLoading(false)
      }
    )

    return () => {
      active = false
    }
  }, [user, router])


  // Step 6: real-time actions for the current phase
  useEffect(() => {
    if (!user || !currentPhase) return
    const unsub = subscribeToActions(user.uid, currentPhase, (newActions) => {
      setActions((prev) => {
        if (prev.length === 0 && newActions.length > 0) {
          setActionsJustLoaded(true) // trigger highlight
          setTimeout(() => setActionsJustLoaded(false), 3000)
        }
        return newActions
      })
    })
    return unsub
  }, [user, currentPhase])

  // Step 7: real-time latest insight for the current phase
  useEffect(() => {
    if (!user || !currentPhase) return
    const unsub = subscribeToLatestInsight(user.uid, currentPhase, setInsight)
    return unsub
  }, [user, currentPhase])

  async function handleToggleAction(actionId: string, currentCompleted: boolean) {
    if (!user) return
    setActions((prev) => prev.map((a) => (a.id === actionId ? { ...a, completed: !currentCompleted } : a)))
    try {
      await toggleAction(user.uid, actionId, !currentCompleted)
    } catch (err) {
      setActions((prev) => prev.map((a) => (a.id === actionId ? { ...a, completed: currentCompleted } : a)))
      console.error('Failed to toggle action:', err)
    }
  }

  if (!user || dataLoading || !profile || !phaseData) {
    return <DashboardSkeleton />
  }

  const activePhase = phaseData.phases.find((p) => p.num === phaseData.currentPhase)

  const profileRows = [
    { label: 'Budget', value: profile.budget },
    { label: 'Down pmt', value: profile.downPmt },
    { label: 'Credit', value: profile.credit },
    { label: 'DTI', value: profile.dti },
    { label: 'Location', value: profile.location },
    { label: 'Timeline', value: profile.timeline },
  ]

  const stats = [
    { label: 'Pre-approval', value: profile.preApproval ?? '—' },
    { label: 'True budget', value: profile.trueBudget ?? '—' },
    { label: 'DTI ratio', value: profile.dti },
    { label: 'Homes watched', value: profile.homesWatched != null ? String(profile.homesWatched) : '—' },
  ]

  return (
    <div className="md:flex">
      {/* Sidebar */}
      <aside className="md:w-[200px] md:fixed md:inset-y-0 md:left-0 md:overflow-y-auto bg-white border-b md:border-b-0 md:border-r border-cream-200 px-5 py-6 md:py-8">
        <SectionLabel>Your journey</SectionLabel>
        <ul className="flex flex-col gap-1 mb-8">
          {phaseData.phases.map((phase) => (
            <li key={phase.num} className="flex items-center gap-3 px-1 py-1.5">
              <PhaseCircle state={phase.state} num={phase.num} />
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold text-bark-900">{phase.name}</span>
                <span
                  className={`font-body text-xs ${phase.state === 'active' ? 'text-teal-600 font-medium' : 'text-bark-600'
                    }`}
                >
                  {phase.status}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-px bg-cream-200 mb-6" />

        <SectionLabel>Your profile</SectionLabel>
        <dl className="flex flex-col gap-3">
          {profileRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <dt className="font-body text-xs text-bark-600">{row.label}</dt>
              <dd className="font-display text-xs font-bold text-bark-900">{row.value}</dd>
            </div>
          ))}
        </dl>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-[200px] px-5 md:px-10 py-8 md:py-10 max-w-5xl">
        <p className="font-body text-xs font-semibold text-teal-600 mb-2">
          Phase {phaseData.currentPhase} of 6
        </p>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-bark-900 mb-2">
          {activePhase?.name ?? 'Your journey'}
        </h1>
        <p className="font-body text-sm text-bark-600 mb-8 max-w-2xl">
          {phaseDescriptions[phaseData.currentPhase]}
        </p>

        {currentPhase === 1 && actions.length === 0 && (
          <p className="text-xs font-body text-teal-600 font-medium mt-1">
            ↓ Gavvy will create your action plan below after your readiness check
          </p>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-cream-200 px-5 py-4">
              <p className="font-body text-xs text-bark-600 mb-1">{stat.label}</p>
              <p className="font-display text-xl font-bold text-bark-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Gavvy insight — only renders once the backend has written one */}
        {insight && (
          <div className="flex gap-3 bg-white rounded-2xl border border-cream-200 border-l-4 border-l-gold-500 px-5 py-4 mb-8">
            <div className="w-8 h-8 shrink-0 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/30">
              <svg className="w-4 h-4 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-bold text-bark-900 mb-1">Gavvy&rsquo;s take</p>
              <p className="font-body text-sm text-bark-600">{insight.message}</p>
            </div>
          </div>
        )}

        {/* Next actions */}
        <section className="mb-8">
          <SectionLabel>Your next actions</SectionLabel>
          {actions.length === 0 && currentPhase === 1 ? (
            <div className="rounded-2xl bg-teal-500/5 border border-teal-500/20 p-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                {/* Gavvy avatar */}
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-display font-bold text-white">G</span>
                </div>
                <div>
                  <p className="text-sm font-display font-semibold text-bark-900 mb-1">
                    Hi! I'm Gavvy — let's figure out if you're ready to buy.
                  </p>
                  <p className="text-sm font-body text-bark-700/70 leading-relaxed">
                    I'll ask you a few quick questions about your finances and
                    give you an honest picture of where you stand. Takes about 3 minutes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => openGavvyChat("Am I ready to buy a home? Let's start my readiness check.")}
                className="btn-primary self-start"
              >
                Start my readiness check with Gavvy →
              </button>
            </div>
          ) : actions.length === 0 ? (
            <p className="text-sm text-bark-700/50 font-body">
              No actions for this phase yet. Ask Gavvy to get started.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {actionsJustLoaded && (
                <div className="flex items-center gap-2 px-1 mb-1">
                  <span className="text-xs font-body text-teal-600">
                    ✓ Gavvy just added these based on your conversation
                  </span>
                </div>
              )}

              {actions.map((action) => (
                <ActionItem
                  key={action.id}
                  action={action}
                  onToggle={() => handleToggleAction(action.id, action.completed)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Tools */}
        <section className="mb-24 md:mb-10">
          <SectionLabel>Gavvy tools for this phase</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </section>

        {/* Ask Gavvy FAB */}
        <button
          onClick={() => setChatOpen(true)}
          className="btn-primary fixed bottom-6 right-6 rounded-full shadow-lg shadow-teal-500/30 z-30"
        >
          Ask Gavvy
        </button>
      </main>

      <GavvyChat isOpen={chatOpen} onClose={() => setChatOpen(false)} currentPhase={phaseData.currentPhase} prefillMessage={chatPrefill} userProfile={profile} />
    </div>
  )
}
