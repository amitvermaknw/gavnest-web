import type { Metadata } from 'next'
import AuthCard from '@/components/AuthCard'

export const metadata: Metadata = {
  title: 'Sign in — GavNest',
}

export default function SignInPage() {
  return <AuthCard mode="sign-in" />
}
