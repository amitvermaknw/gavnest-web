'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { setUserProfile } from '@/lib/firestore'
import LoadingScreen from '@/components/LoadingScreen'

const budgetOptions = ['Under $250k', '$250k-$350k', '$350k-$500k', '$500k-$750k', '$750k+']
const downPmtOptions = ['Less than 5%', '5-10%', '10-20%', '20%+']
const creditOptions = ['Below 620', '620-679', '680-739', '740-799', '800+']
const dtiOptions = ['Under 28%', '28-36%', '36-43%', 'Over 43%']
const timelineOptions = ['Already looking', '1-3 months', '3-6 months', '6-12 months', 'Just exploring']

type FormData = {
  budget: string
  downPmt: string
  credit: string
  dti: string
  location: string
  timeline: string
}

const emptyForm: FormData = {
  budget: '', downPmt: '', credit: '', dti: '', location: '', timeline: '',
}

function Select({
  label, value, onChange, options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-xs font-bold text-bark-600 uppercase tracking-wide">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-bark-800/15 bg-white px-4 py-3 font-body text-sm text-bark-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="" disabled>Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  )
}

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`w-2 h-2 rounded-full ${n <= step ? 'bg-teal-500' : 'bg-cream-200'}`} />
      ))}
    </div>
  )
}

export default function OnboardingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.replace('/sign-in')
  }, [loading, user, router])

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  const canContinue =
    step === 1
      ? !!(form.budget && form.downPmt && form.credit && form.dti)
      : step === 2
        ? !!(form.location.trim() && form.timeline)
        : true

  async function handleSubmit() {
    if (!user) return
    setError(null)
    setSubmitting(true)
    try {
      await setUserProfile(user.uid, {
        budget: form.budget,
        downPmt: form.downPmt,
        credit: form.credit,
        dti: form.dti,
        location: form.location.trim(),
        timeline: form.timeline,
      })
      router.push('/dashboard')
    } catch {
      setError('Something went wrong saving your profile. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingScreen />
  if (!user) return null

  const summaryRows = [
    { label: 'Budget range', value: form.budget },
    { label: 'Down payment', value: form.downPmt },
    { label: 'Credit score', value: form.credit },
    { label: 'DTI ratio', value: form.dti },
    { label: 'Location', value: form.location },
    { label: 'Timeline', value: form.timeline },
  ]

  return (
    <div className="min-h-screen bg-cream-50 px-5 py-8 md:py-12">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/30">
            <svg className="w-4 h-4 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-bark-900">
            Gav<span className="text-teal-500">Nest</span>
          </span>
        </Link>

        <div className="flex items-center justify-between mb-8">
          <span className="font-body text-xs font-semibold text-bark-600">Step {step} of 3</span>
          <ProgressDots step={step} />
        </div>

        <div key={step} className="animate-fade-up bg-white rounded-2xl border border-cream-200 px-6 py-8">
          {step === 1 && (
            <>
              <h1 className="font-display text-2xl font-bold text-bark-900 mb-1">Your financial snapshot</h1>
              <p className="font-body text-sm text-bark-600 mb-6">
                This helps Gavvy work out your true budget — not just the asking price.
              </p>
              <div className="flex flex-col gap-4">
                <Select label="Budget range" value={form.budget} onChange={(v) => update('budget', v)} options={budgetOptions} />
                <Select label="Down payment %" value={form.downPmt} onChange={(v) => update('downPmt', v)} options={downPmtOptions} />
                <Select label="Credit score range" value={form.credit} onChange={(v) => update('credit', v)} options={creditOptions} />
                <Select label="DTI ratio" value={form.dti} onChange={(v) => update('dti', v)} options={dtiOptions} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="font-display text-2xl font-bold text-bark-900 mb-1">Your search</h1>
              <p className="font-body text-sm text-bark-600 mb-6">Where and when are you looking to buy?</p>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-display text-xs font-bold text-bark-600 uppercase tracking-wide">Location</span>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => update('location', e.target.value)}
                    placeholder="Phoenix, AZ"
                    className="rounded-xl border border-bark-800/15 bg-white px-4 py-3 font-body text-sm text-bark-800 placeholder:text-bark-600/60 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </label>
                <Select label="Timeline" value={form.timeline} onChange={(v) => update('timeline', v)} options={timelineOptions} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="font-display text-2xl font-bold text-bark-900 mb-1">Confirm your details</h1>
              <p className="font-body text-sm text-bark-600 mb-6">
                Here&rsquo;s what Gavvy will use to personalize your journey.
              </p>
              <dl className="flex flex-col gap-3">
                {summaryRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-cream-200 pb-2 last:border-b-0">
                    <dt className="font-body text-sm text-bark-600">{row.label}</dt>
                    <dd className="font-display text-sm font-bold text-bark-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
              {error && (
                <p className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 font-body text-sm text-red-700">
                  {error}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="font-body text-sm font-medium text-teal-600 hover:text-teal-700"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving…' : 'Start my journey with Gavvy'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
