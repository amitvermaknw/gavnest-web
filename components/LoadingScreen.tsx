export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-cream-50">
      <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm shadow-teal-500/30 animate-pulse-slow">
        <svg className="w-5 h-5 text-cream-50" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 2L2 7.5v8.5h4.5v-5h5v5H16V7.5L9 2z" />
        </svg>
      </div>
      <span className="w-6 h-6 rounded-full border-2 border-teal-500/20 border-t-teal-500 animate-spin" />
    </div>
  )
}
