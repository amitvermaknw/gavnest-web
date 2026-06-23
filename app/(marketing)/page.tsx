import Link from 'next/link'

/* ─── helpers ─────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-display font-bold
                     tracking-[.08em] uppercase text-teal-600
                     bg-teal-500/10 border border-teal-500/20
                     rounded-full px-4 py-1.5 mb-6">
      {children}
    </span>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display font-extrabold text-3xl md:text-[2.5rem]
                   text-bark-900 leading-[1.1] tracking-[-0.022em] text-balance">
      {children}
    </h2>
  )
}

/* ─── HERO ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">

      {/* backgrounds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-cream-50">
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-teal-500/5 via-cream-100/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-400/10 blur-[110px] rounded-full" />
      </div>
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-1/2 h-full -z-10 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle, #2A9D8F25 1px, transparent 1px)', backgroundSize: '26px 26px' }} />

      <div className="max-w-6xl mx-auto w-full px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center py-20 md:py-24">

        {/* LEFT */}
        <div className="flex flex-col">

          {/* pill */}
          <div className="animate-fade-up self-start flex items-center gap-2.5
                          bg-teal-500/10 border border-teal-500/20
                          rounded-full px-4 py-2 mb-7">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
            </span>
            <span className="text-[10px] font-display font-bold text-teal-700 tracking-[.07em] uppercase">
              Early access · Phoenix, AZ
            </span>
          </div>

          {/* headline */}
          <h1 className="animate-fade-up animate-delay-100
                         font-display font-extrabold text-balance
                         text-[2.4rem] sm:text-5xl md:text-[3rem]
                         text-bark-900 leading-[1.1] tracking-[-0.025em]">
            The home-buying companion{' '}
            <span className="relative inline whitespace-nowrap">
              <span className="relative z-10 text-teal-600">your network</span>
              <svg aria-hidden className="absolute -bottom-1 left-0 w-full overflow-visible"
                viewBox="0 0 240 9" fill="none" preserveAspectRatio="none" style={{ height: '9px' }}>
                <path d="M2 7 C60 2.5, 180 2.5, 238 7" stroke="#E9C46A" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>{' '}
            never gave you.
          </h1>

          {/* subheadline */}
          <p className="animate-fade-up animate-delay-200
                        mt-6 text-[0.95rem] text-bark-700/65 leading-[1.8] max-w-md font-body">
            Gavvy watches your rate lock, flags HOA red flags, reads the fine print,
            and walks you through every phase — from "am I ready?" to keys in hand.
            No sales pitch. Just clarity.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animate-delay-300 mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/sign-up" className="btn-primary justify-center sm:justify-start px-7 py-3.5">
              Start free with Gavvy
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="#meet-gavvy" className="btn-outline justify-center sm:justify-start px-7 py-3.5">
              See how Gavvy works
            </Link>
          </div>

          {/* trust row */}
          <div className="animate-fade-up animate-delay-400 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
            {['Free to start', 'No credit card', 'Research & education only'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <span className="text-teal-500 font-display font-bold text-sm">✓</span>
                <span className="text-[11px] text-bark-700/50 font-body font-medium">{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Gavvy card */}
        <div className="animate-fade-up animate-delay-200 relative flex flex-col items-center lg:items-end pt-6 pb-6">

          {/* top badge */}
          <div className="absolute -top-1 left-2 lg:-left-4 z-20
                          flex items-center gap-2 bg-white rounded-2xl
                          border border-gold-400/30 shadow-lg shadow-bark-900/10
                          px-3.5 py-2.5">
            <div className="w-7 h-7 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gold-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[9px] font-display font-bold text-gold-600 uppercase tracking-[.07em]">Gavvy flagged</div>
              <div className="text-[11px] text-bark-800 font-display font-semibold mt-0.5">HOA assessment · $8,400</div>
            </div>
          </div>

          {/* main card */}
          <div className="w-full max-w-[340px] bg-white rounded-2xl border border-cream-200
                          shadow-2xl shadow-bark-900/10 overflow-hidden">

            {/* card header */}
            <div className="bg-teal-500 px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
                    <circle cx="8" cy="8" r="3" fill="currentColor" fillOpacity=".2"/>
                    <circle cx="14" cy="8" r="3" fill="currentColor" fillOpacity=".2"/>
                    <circle cx="8" cy="7.5" r="1.1" fill="white" stroke="none"/>
                    <circle cx="14" cy="7.5" r="1.1" fill="white" stroke="none"/>
                    <path d="M9.2 11c0 0 .7.9 1.8.9s1.8-.9 1.8-.9"/>
                    <path d="M6 5c2-3.5 8-3.5 10 0"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[12.5px] font-display font-bold text-white">Gavvy</div>
                  <div className="text-[9.5px] text-teal-100/75 flex items-center gap-1.5 font-body mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-200 inline-block" />
                    Watching your journey
                  </div>
                </div>
              </div>
              <div className="text-[9.5px] font-display font-semibold text-teal-100/70 bg-white/10 rounded-full px-2.5 py-1">
                Phase 3 of 6
              </div>
            </div>

            {/* progress */}
            <div className="h-[3px] bg-cream-200">
              <div className="h-[3px] w-1/2 bg-gold-400" />
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 divide-x divide-cream-200 border-b border-cream-200">
              {[
                { label: 'Pre-approval', value: '$435k', color: '' },
                { label: 'True budget',  value: '$390k', color: '' },
                { label: 'Rate lock',    value: '18 days', color: 'text-gold-600' },
              ].map((s) => (
                <div key={s.label} className="px-3 py-3 text-center">
                  <div className="text-[8.5px] text-bark-700/40 font-body mb-1">{s.label}</div>
                  <div className={`text-[12.5px] font-display font-extrabold text-bark-900 ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* chat */}
            <div className="px-3.5 py-3.5 flex flex-col gap-2.5 bg-cream-50/60">
              {/* gavvy message */}
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[8px] font-display font-bold text-white">G</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 border border-cream-200 max-w-[86%]">
                  <p className="text-[10.5px] text-bark-700 leading-[1.6] font-body">
                    Your rate lock expires in <strong className="font-display font-bold text-bark-900">18 days</strong>. Phoenix inventory dropped 12% — want me to draft a lock extension request?
                  </p>
                </div>
              </div>
              {/* user reply */}
              <div className="flex justify-end">
                <div className="bg-teal-500 rounded-2xl rounded-tr-sm px-3 py-2.5 max-w-[80%]">
                  <p className="text-[10.5px] text-white leading-[1.6] font-body">Yes, and check the HOA on Camelback.</p>
                </div>
              </div>
              {/* gavvy reply */}
              <div className="flex gap-2 items-start">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[8px] font-display font-bold text-white">G</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2.5 border border-cream-200 max-w-[86%]">
                  <p className="text-[10.5px] text-bark-700 leading-[1.6] font-body">
                    Found a <strong className="font-display font-bold text-gold-600">pending $8,400 assessment</strong> — flagged in your dashboard. Negotiate this before signing.
                  </p>
                </div>
              </div>
              {/* typing */}
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-[8px] font-display font-bold text-white">G</span>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm px-3.5 py-2.5 border border-cream-200 flex gap-1 items-center">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </div>

            {/* input bar */}
            <div className="px-3.5 py-3 border-t border-cream-200 flex items-center gap-2 bg-white">
              <div className="flex-1 bg-cream-100 rounded-xl px-3 py-2 text-[10px] text-bark-700/30 font-body">
                Ask Gavvy anything…
              </div>
              <div className="w-7 h-7 rounded-xl bg-teal-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* bottom badge */}
          <div className="absolute -bottom-1 right-2 lg:-right-4 z-20
                          flex items-center gap-2 bg-teal-500 rounded-2xl
                          shadow-lg shadow-teal-500/30 px-3.5 py-2.5">
            <svg className="w-3 h-3 text-teal-100" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden>
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10.5px] font-display font-bold text-white">3 actions ready for you</span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="flex justify-center pb-10">
        <svg className="w-4 h-4 text-bark-700/20 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

/* ─── PROBLEM ─────────────────────────────────────────────── */
function Problem() {
  const pains = [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title: 'Hidden costs blindside you',
      body: 'Closing costs, HOA assessments, flood insurance, inspection repairs — buyers routinely discover $15–40k in surprises after going under contract.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01" strokeLinecap="round"/></svg>,
      title: 'Everyone has an angle',
      body: "Agents, lenders, title companies — they're paid on commission. You deserve a source of truth that's on your side, not on someone else's payroll.",
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden><path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      title: 'Information overload, zero clarity',
      body: 'Reddit threads, YouTube videos, 47-tab spreadsheets. Most buyers spend 300+ hours researching and still feel unprepared on closing day.',
    },
  ]

  return (
    <section id="problem" className="py-20 md:py-28 px-5 bg-bark-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-display font-bold
                           tracking-[.08em] uppercase text-teal-400
                           bg-teal-500/10 border border-teal-500/25
                           rounded-full px-4 py-1.5 mb-6">
            The problem
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-[2.5rem]
                         text-cream-50 text-balance leading-[1.1] tracking-[-0.022em] max-w-2xl mx-auto">
            Home buying is the biggest financial decision of your life.
            <span className="text-gold-400"> It shouldn't be this hard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pains.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/5 bg-white/5 p-7 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400">
                {p.icon}
              </div>
              <h3 className="font-display font-bold text-[15px] text-cream-100 leading-snug">{p.title}</h3>
              <p className="text-[13px] text-cream-200/55 leading-relaxed font-body">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="font-display font-bold text-xl md:text-2xl text-cream-50 max-w-2xl mx-auto leading-snug tracking-[-0.015em]">
            What if you had a knowledgeable friend who happened to know everything about real estate, mortgages, and local markets?
          </p>
          <p className="mt-3 text-sm text-teal-400 font-display font-semibold">That's Gavvy.</p>
        </div>
      </div>
    </section>
  )
}

/* ─── MEET GAVVY ──────────────────────────────────────────── */
function MeetGavvy() {
  return (
    <section id="meet-gavvy" className="py-20 md:py-28 px-5 bg-cream-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* left */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-2xl animate-pulse-slow scale-110" aria-hidden />
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-teal-400 to-teal-700 flex items-center justify-center shadow-2xl shadow-teal-500/30">
                <svg className="w-14 h-14 md:w-18 md:h-18 text-cream-50" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <ellipse cx="28" cy="34" rx="16" ry="18" fill="currentColor" opacity=".12"/>
                  <circle cx="21" cy="24" r="4.5" fill="currentColor"/>
                  <circle cx="35" cy="24" r="4.5" fill="currentColor"/>
                  <circle cx="21" cy="23.5" r="1.6" fill="#134540" stroke="none"/>
                  <circle cx="35" cy="23.5" r="1.6" fill="#134540" stroke="none"/>
                  <path d="M24.5 31c0 0 1.8 2.2 3.5 2.2s3.5-2.2 3.5-2.2"/>
                  <path d="M16 16c3-8 8-12 12-12s9 4 12 12"/>
                </svg>
              </div>
            </div>

            {/* chat preview */}
            <div className="w-full max-w-sm bg-white rounded-2xl border border-cream-200 shadow-xl shadow-bark-900/5 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-cream-200 bg-cream-50">
                <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-[10px] font-display font-bold text-white">G</span>
                </div>
                <div>
                  <div className="text-[12px] font-display font-bold text-bark-900">Gavvy</div>
                  <div className="text-[10px] text-teal-500 flex items-center gap-1 font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" /> Online
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {[
                  { from: 'gavvy', text: "Hi! I noticed your rate lock expires in 18 days. Want me to draft a lock-extension request for your lender?" },
                  { from: 'user',  text: "Yes please! Also what's the HOA situation on Camelback?" },
                  { from: 'gavvy', text: "On it. The HOA has a pending $8,400 special assessment — I flagged it in your watched properties with the full breakdown." },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[82%] text-[11px] leading-relaxed font-body rounded-2xl px-3.5 py-2.5 ${
                      m.from === 'gavvy'
                        ? 'bg-cream-100 text-bark-800 rounded-tl-sm'
                        : 'bg-teal-500 text-cream-50 rounded-tr-sm'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 mt-0.5">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce"
                      style={{ animationDelay: `${d}ms` }} />
                  ))}
                  <span className="text-[10px] text-bark-700/40 font-body">Gavvy is typing…</span>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div>
            <Eyebrow>Meet Gavvy</Eyebrow>
            <SectionHeading>Your AI companion who's always in your corner</SectionHeading>
            <p className="mt-5 text-[0.95rem] text-bark-700/70 leading-[1.8] font-body">
              Gavvy isn't a chatbot that answers generic questions. Gavvy <em>knows your journey</em> — your budget, pre-approval, watched properties, and timeline — and proactively surfaces what matters before it becomes a problem.
            </p>
            <p className="mt-4 text-[0.95rem] text-bark-700/70 leading-[1.8] font-body">
              Think of Gavvy as the knowledgeable friend who used to be available only to people who knew the right real estate attorney, mortgage broker, or inspector. Now available to everyone.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Watches your rate lock expiry',
                'Flags HOA special assessments',
                'Tracks Phoenix market inventory',
                'Guides every phase, step by step',
                'Explains the fine print plainly',
                'No sales pitch. Ever.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2.8" viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[13px] text-bark-700 font-body leading-snug">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/sign-up" className="btn-primary">
                Start talking to Gavvy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FEATURES ────────────────────────────────────────────── */
function Features() {
  const phases = [
    { num: '01', phase: 'Am I ready?',       headline: 'Know before you browse',                    body: "Gavvy runs your real numbers — income, debts, credit, savings — and tells you honestly whether you're ready, nearly ready, or what to fix first.",                                       color: 'teal' },
    { num: '02', phase: 'Get pre-approved',  headline: 'Navigate lenders without getting played',   body: "Gavvy explains what lenders look at, what rate is fair for your profile today, and how to compare offers without the jargon.",                                                          color: 'teal' },
    { num: '03', phase: 'Search & evaluate', headline: 'See what others miss',                      body: "HOA docs, flood zone maps, permit history, price trends — Gavvy pulls and digests it all. You focus on whether you love the house; Gavvy handles due diligence.",                       color: 'teal' },
    { num: '04', phase: 'Make an offer',     headline: 'Negotiate from a position of knowledge',    body: "Gavvy shows you what comparable homes actually sold for, how long this one's sat, and what a strong offer looks like — so you're not guessing when it matters most.",                   color: 'gold' },
    { num: '05', phase: 'Under contract',    headline: "Don't miss a single deadline",              body: "Inspection contingency, appraisal gap, repair requests — the contract phase is where deals fall apart. Gavvy tracks every deadline and explains every clause.",                         color: 'gold' },
    { num: '06', phase: 'Close & move in',   headline: 'Cross the finish line with clarity',        body: "Final walkthrough checklist, closing disclosure review, what to bring on closing day. Gavvy walks you to the door.",                                                                     color: 'gold' },
  ]

  return (
    <section id="features" className="py-20 md:py-28 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>The journey</Eyebrow>
          <SectionHeading>
            Six phases. One companion.{' '}
            <span className="text-teal-500">No gaps.</span>
          </SectionHeading>
          <p className="mt-5 text-[0.9rem] text-bark-700/60 max-w-lg mx-auto leading-relaxed font-body">
            Most tools help you search. GavNest helps you buy — from the first question to keys in hand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phases.map((p) => (
            <div key={p.num}
              className="group rounded-2xl bg-white border border-cream-200 p-7
                         hover:border-teal-300/50 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <span className={`text-[9.5px] font-display font-bold tracking-[.07em] uppercase px-3 py-1.5 rounded-full border ${
                  p.color === 'gold'
                    ? 'text-gold-600 bg-gold-400/10 border-gold-400/20'
                    : 'text-teal-600 bg-teal-500/10 border-teal-500/20'
                }`}>
                  Phase {p.num}
                </span>
                <span className="text-[11px] text-bark-700/40 font-body">{p.phase}</span>
              </div>
              <h3 className="font-display font-bold text-[14.5px] text-bark-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                {p.headline}
              </h3>
              <p className="text-[12.5px] text-bark-700/60 leading-relaxed font-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── MISSION ─────────────────────────────────────────────── */
function Mission() {
  return (
    <section id="mission" className="py-20 md:py-28 px-5 bg-cream-100">
      <div className="max-w-3xl mx-auto text-center">
        <Eyebrow>Our mission</Eyebrow>
        <SectionHeading>Village wisdom, democratized</SectionHeading>

        <div className="mt-8 space-y-5 text-left">
          {[
            "There's a version of home buying that happens when you know the right people. Your uncle who's a real estate attorney. Your neighbor who did mortgages for 20 years. The friend who's bought four houses and knows exactly what to watch for.",
            "That version is calmer, smarter, and cheaper. People in that network overpay less, get surprised less, and close with more confidence.",
          ].map((t, i) => (
            <p key={i} className="text-[0.95rem] md:text-base text-bark-700/75 leading-[1.8] font-body">{t}</p>
          ))}
          <p className="text-[0.95rem] md:text-base text-bark-800 font-display font-semibold leading-[1.75]">
            GavNest exists to give every buyer access to that network — regardless of background, connections, or ZIP code.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { label: 'Who we serve',  value: 'First-time and move-up buyers who want clarity, not sales pitches.' },
            { label: 'What we believe', value: 'The best financial decision is an informed one, not an impulsive one.' },
            { label: 'Our promise',   value: 'Gavvy is always on your side. We never take referral fees or sell your data.' },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl bg-white border border-cream-200 p-5">
              <div className="text-[9.5px] font-display font-bold tracking-[.07em] uppercase text-teal-600 mb-3">{m.label}</div>
              <p className="text-[12.5px] text-bark-700 leading-relaxed font-body">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SOCIAL PROOF ────────────────────────────────────────── */
function SocialProof() {
  const quotes = [
    { text: "I had no idea there was a pending HOA assessment on the place I was about to offer full ask on. Gavvy caught it in 30 seconds from the doc I uploaded.", name: 'Priya M.',  detail: 'First-time buyer, Phoenix AZ' },
    { text: "My lender kept telling me I could afford $520k. Gavvy ran my actual numbers and showed me why $410k was the smarter ceiling. That peace of mind is worth everything.", name: 'Marcus T.', detail: 'Buyer, Scottsdale AZ' },
    { text: "I spent 6 months paralyzed by research. Gavvy turned it into a clear six-step plan and told me exactly what to do next.", name: 'Sofia R.',  detail: 'First-time buyer, Tempe AZ' },
  ]

  return (
    <section className="py-20 md:py-28 px-5 bg-bark-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[10px] font-display font-bold
                           tracking-[.08em] uppercase text-teal-400
                           bg-teal-500/10 border border-teal-500/25
                           rounded-full px-4 py-1.5 mb-6">
            Early users
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-[2.5rem]
                         text-cream-50 text-balance leading-[1.1] tracking-[-0.022em] max-w-xl mx-auto">
            What buyers say after their first week with Gavvy
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quotes.map((q) => (
            <div key={q.name} className="rounded-2xl bg-white/5 border border-white/5 p-7 flex flex-col gap-5">
              <svg className="w-7 h-5 text-gold-400/55" fill="currentColor" viewBox="0 0 30 20" aria-hidden>
                <path d="M0 20V12.5C0 5.596 3.93 1.458 11.79 0l1.46 2.292C9.875 3.25 7.917 5.167 7.5 8.333H12.5V20H0zm17.5 0V12.5C17.5 5.596 21.43 1.458 29.29 0l1.46 2.292C27.375 3.25 25.417 5.167 25 8.333H30V20H17.5z"/>
              </svg>
              <p className="text-[13px] text-cream-200/60 leading-relaxed font-body flex-1">{q.text}</p>
              <div>
                <div className="text-[13px] font-display font-bold text-cream-100">{q.name}</div>
                <div className="text-[11px] text-cream-200/40 mt-0.5 font-body">{q.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FINAL CTA ───────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-20 md:py-28 px-5 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-teal-400/10 blur-[100px]" />
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 rounded-2xl bg-teal-500 mx-auto mb-8 flex items-center justify-center shadow-xl shadow-teal-500/20">
          <svg className="w-7 h-7 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
          </svg>
        </div>
        <h2 className="font-display font-extrabold text-3xl md:text-[2.75rem]
                       text-bark-900 leading-[1.1] tracking-[-0.022em] text-balance">
          Your home is waiting.<br />
          <span className="text-teal-500">Start with clarity.</span>
        </h2>
        <p className="mt-6 text-[0.95rem] text-bark-700/65 leading-[1.8] max-w-md mx-auto font-body">
          Join buyers navigating one of life's biggest decisions with a companion who's genuinely on their side. Free to start. No credit card.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/sign-up" className="btn-primary w-full sm:w-auto justify-center px-9 py-4">
            Begin your journey with Gavvy
          </Link>
          <Link href="/sign-in" className="btn-outline w-full sm:w-auto justify-center px-8 py-4">
            Sign in
          </Link>
        </div>
        <p className="mt-5 text-[11px] text-bark-700/40 font-body">
          For research & education only · Not financial or legal advice
        </p>
      </div>
    </section>
  )
}

/* ─── PAGE ────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <MeetGavvy />
      <Features />
      <Mission />
      <SocialProof />
      <FinalCTA />
    </>
  )
}
