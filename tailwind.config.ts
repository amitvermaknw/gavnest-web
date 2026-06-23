import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#FAFAF7',
          100: '#F5F2EA',
          200: '#EDE0C4',
          300: '#E2D0A8',
        },
        teal: {
          400: '#3ABAB4',
          500: '#2A9D8F',
          600: '#237B73',
          700: '#1B5E58',
          800: '#134540',
        },
        gold: {
          300: '#F2D48C',
          400: '#E9C46A',
          500: '#D4A84B',
          600: '#B8922A',
        },
        bark: {
          600: '#5C4F3D',
          700: '#3D3228',
          800: '#2A231B',
          900: '#141210',
        },
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-inter)',   'system-ui', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem',    { lineHeight: '1.08', letterSpacing: '-0.022em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.026em' }],
        '7xl': ['4.5rem',  { lineHeight: '1.03', letterSpacing: '-0.03em'  }],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'drift-a':    'driftA 20s ease-in-out infinite',
        'drift-b':    'driftB 26s ease-in-out infinite 7s',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        driftA: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(40px,-30px) scale(1.1)' },
        },
        driftB: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%':     { transform: 'translate(-30px,20px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
