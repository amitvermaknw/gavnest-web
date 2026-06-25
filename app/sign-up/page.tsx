import type { Metadata } from 'next'
import AuthCard from '@/components/AuthCard'

export const metadata: Metadata = {
  title: 'Create your account — GavNest',
}

export default function SignUpPage() {
  return <AuthCard mode="sign-up" />
}
