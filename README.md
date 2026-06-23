# gavnest-web

Next.js 14 (App Router) — GavNest marketing site + authenticated app, unified.

## Project structure

```
gavnest-web/
├── app/
│   ├── layout.tsx              ← Root layout (fonts, metadata, globals.css)
│   ├── globals.css             ← Tailwind + brand tokens + utilities
│   │
│   ├── (marketing)/            ← Public-facing pages (no auth required)
│   │   ├── layout.tsx          ← Wraps with MarketingNav + MarketingFooter
│   │   ├── page.tsx            ← Homepage (Hero, Problem, MeetGavvy, Features, Mission, CTA)
│   │   ├── about/page.tsx      ← About page (TODO)
│   │   └── features/page.tsx   ← Features deep-dive (TODO)
│   │
│   ├── (app)/                  ← Authenticated app shell
│   │   ├── layout.tsx          ← Firebase Auth guard → redirect to /sign-in if no session
│   │   └── dashboard/
│   │       └── page.tsx        ← Main Gavvy dashboard (phase nav, stats, actions)
│   │
│   ├── sign-in/page.tsx        ← Google Sign-in page (TODO)
│   └── sign-up/page.tsx        ← Sign-up page (TODO)
│
├── components/
│   ├── marketing/
│   │   ├── MarketingNav.tsx    ← Responsive nav with mobile hamburger
│   │   └── MarketingFooter.tsx ← Footer with links
│   └── ui/
│       └── (shared components — buttons, badges, etc.)
│
├── lib/
│   ├── firebase.ts             ← Firebase app init (TODO)
│   └── auth.ts                 ← Auth helpers (TODO)
│
├── tailwind.config.ts          ← Brand tokens: cream, teal, gold, bark
└── README.md
```

## Route groups explained

- `(marketing)` — route group, no URL segment. Pages are public.
- `(app)` — route group, no URL segment. Auth guard in layout.tsx.

So `/dashboard` is served by `app/(app)/dashboard/page.tsx`.
And `/` (homepage) is served by `app/(marketing)/page.tsx`.

## Brand tokens

| Token        | Value      | Usage                        |
|-------------|------------|------------------------------|
| cream-50    | #FFFDF8    | Page background              |
| cream-100   | #FBF7EE    | Section alternate bg         |
| teal-500    | #2A9D8F    | Primary brand, CTAs          |
| gold-400    | #E9C46A    | Accent, highlights           |
| bark-900    | #1A1610    | Dark sections bg             |
| bark-800    | #2A231B    | Body text                    |

## Fonts

- `Syne` — display headings, labels, eyebrows (font-display)
- `DM Sans` — body copy, UI text (font-body)

## Environment variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GAVVY_AGENT_URL=https://gavnest-agent-xxx-uc.a.run.app
DEV_MODE=true
```

## Next steps

1. `npx create-next-app@latest gavnest-web --typescript --tailwind --app` and copy these files in
2. Add Firebase config to `.env.local`
3. Build `sign-in/page.tsx` with Google Auth
4. Build `app/(app)/dashboard/page.tsx` with the Gavvy dashboard UI
5. Wire Gavvy chat to FastAPI backend SSE stream
