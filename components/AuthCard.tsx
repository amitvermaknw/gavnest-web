'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

type AuthCardProps = {
  mode: 'sign-in' | 'sign-up'
}

const copy = {
  'sign-in': {
    heading: 'Welcome back',
    subtitle: 'Sign in to continue your home-buying journey with Gavvy.',
    crossLinkLabel: "Don't have an account?",
    crossLinkHref: '/sign-up',
    crossLinkCta: 'Sign up',
  },
  'sign-up': {
    heading: 'Create your free account',
    subtitle: 'Start your home-buying journey with Gavvy — free, no credit card required.',
    crossLinkLabel: 'Already have an account?',
    crossLinkHref: '/sign-in',
    crossLinkCta: 'Sign in',
  },
} as const

export default function AuthCard({ mode }: AuthCardProps) {
  const { signInWithGoogle } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { heading, subtitle, crossLinkLabel, crossLinkHref, crossLinkCta } = copy[mode]

  async function handleGoogleAuth() {
    setError(null)
    setLoading(true)
    try {
      await signInWithGoogle()
      router.push('/dashboard')
    } catch {
      setError('Something went wrong signing in with Google. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 px-5 py-12">
      <Link href="/" className="flex items-center gap-2 mb-10 group">
        <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow">
          <svg className="w-5 h-5 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
          </svg>
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-bark-900">
          Gav<span className="text-teal-500">Nest</span>
        </span>
      </Link>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg shadow-bark-800/5 border border-cream-200 px-7 py-9">
        <h1 className="font-display font-bold text-2xl text-bark-900 text-center mb-2">
          {heading}
        </h1>
        <p className="font-body text-sm text-bark-600 text-center mb-8">
          {subtitle}
        </p>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-body text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-bark-800/15 bg-white hover:bg-cream-100 disabled:opacity-60 disabled:cursor-not-allowed text-bark-800 font-display font-bold text-[13.5px] px-6 py-3 transition-all duration-150 active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
        >
          {loading ? (
            <span className="w-5 h-5 rounded-full border-2 border-bark-800/20 border-t-bark-800/70 animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>

        <p className="mt-7 text-center text-sm font-body text-bark-600">
          {crossLinkLabel}{' '}
          <Link href={crossLinkHref} className="font-medium text-teal-600 hover:text-teal-700">
            {crossLinkCta}
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-8 text-sm font-body text-bark-600 hover:text-teal-600 transition-colors">
        ← Back to homepage
      </Link>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  )
}
