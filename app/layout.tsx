import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GavNest — Village wisdom. AI speed.',
  description:
    'GavNest is your AI-powered home-buying companion. Gavvy walks with you through every step — budgets, mortgage rates, flood zones, HOA docs — so you make confident decisions.',
  metadataBase: new URL('https://gavnest.com'),
  openGraph: {
    title: 'GavNest — Village wisdom. AI speed.',
    description: 'Your AI home-buying companion, Gavvy, is here.',
    url: 'https://gavnest.com',
    siteName: 'GavNest',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GavNest — Village wisdom. AI speed.',
    description: 'Your AI home-buying companion, Gavvy, is here.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="font-body bg-cream-50 text-bark-800 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
