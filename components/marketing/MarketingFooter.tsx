import Link from 'next/link'

export default function MarketingFooter() {
  return (
    <footer className="bg-bark-900 text-cream-200">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-teal-400" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
                </svg>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-cream-50">
                Gav<span className="text-teal-400">Nest</span>
              </span>
            </div>
            <p className="text-sm text-cream-300/70 leading-relaxed max-w-xs">
              Village wisdom. AI speed.<br />
              Your companion through every step of buying a home.
            </p>
            <p className="mt-5 text-xs text-cream-300/40">
              For research & education only. Not financial or legal advice.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-display font-semibold tracking-widest uppercase text-cream-300/50 mb-4">Product</h3>
            <ul className="space-y-2.5">
              {['Features', 'Meet Gavvy', 'Mission', 'Pricing'].map((l) => (
                <li key={l}>
                  <Link href={`#${l.toLowerCase().replace(' ', '-')}`} className="text-sm text-cream-300/60 hover:text-teal-400 transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-display font-semibold tracking-widest uppercase text-cream-300/50 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Privacy', 'Terms'].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-cream-300/60 hover:text-teal-400 transition-colors">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-cream-200/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-300/35">© 2026 GavNest. All rights reserved.</p>
          <p className="text-xs text-cream-300/35">Built with care in Phoenix, AZ</p>
        </div>
      </div>
    </footer>
  )
}
