'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function MarketingNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#problem',  label: 'The problem' },
    { href: '#features', label: 'Features' },
    { href: '#meet-gavvy', label: 'Meet Gavvy' },
    { href: '#mission',  label: 'Mission' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-md shadow-sm shadow-bark-800/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow">
            <svg className="w-4.5 h-4.5 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
            </svg>
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-bark-900">
            Gav<span className="text-teal-500">Nest</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-bark-600 hover:text-teal-600 font-medium rounded-xl hover:bg-teal-500/5 transition-all"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/sign-in" className="text-sm font-medium text-bark-600 hover:text-teal-600 transition-colors">
            Sign in
          </Link>
          <Link href="/sign-up" className="btn-primary text-sm py-2 px-5">
            Try Gavvy free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-cream-200 transition-colors"
        >
          <span className={`block w-5 h-0.5 bg-bark-800 transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-bark-800 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-bark-800 transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="bg-cream-50/95 backdrop-blur-md border-t border-cream-200 px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 py-3 text-sm font-medium text-bark-700 hover:text-teal-600 hover:bg-teal-500/5 rounded-xl transition-all"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-cream-200 flex flex-col gap-2">
            <Link href="/sign-in" onClick={() => setOpen(false)} className="btn-outline text-center justify-center text-sm py-2.5">
              Sign in
            </Link>
            <Link href="/sign-up" onClick={() => setOpen(false)} className="btn-primary text-center justify-center text-sm py-2.5">
              Try Gavvy free
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
