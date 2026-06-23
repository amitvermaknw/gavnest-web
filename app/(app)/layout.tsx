// app/(app)/layout.tsx
// This wraps all authenticated routes — dashboard, phase pages, etc.
// Firebase Auth guard goes here.

import { redirect } from 'next/navigation'

// TODO: replace with real Firebase auth check
async function getUser() {
  // In DEV_MODE, return a mock user
  if (process.env.DEV_MODE === 'true') {
    return { uid: 'dev-user', name: 'Amit V.', email: 'dev@gavnest.com' }
  }
  return null // triggers redirect to sign-in
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {children}
    </div>
  )
}
