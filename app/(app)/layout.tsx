// app/(app)/layout.tsx
// This wraps all authenticated routes — dashboard, phase pages, etc.

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { hasUserProfile } from '@/lib/firestore'
import LoadingScreen from '@/components/LoadingScreen'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profileChecked, setProfileChecked] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)

  useEffect(() => {
    if (!loading && !user) router.replace('/sign-in')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    let active = true
    setProfileChecked(false)
    hasUserProfile(user.uid).then((exists) => {
      if (!active) return
      setHasProfile(exists)
      setProfileChecked(true)
    })
    return () => {
      active = false
    }
  }, [user])

  useEffect(() => {
    if (profileChecked && !hasProfile) router.replace('/onboarding')
  }, [profileChecked, hasProfile, router])

  if (loading) return <LoadingScreen />
  if (!user) return null
  if (!profileChecked) return <LoadingScreen />
  if (!hasProfile) return null

  return <div className="min-h-screen bg-cream-50">{children}</div>
}
