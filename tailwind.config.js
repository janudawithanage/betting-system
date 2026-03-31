/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea6811',
          700: '#c2570e',
          800: '#9a4209',
          900: '#7c3a07',
          950: '#431d03',
        },
        // Background system
        bg: {
          primary: '#0a0d14',
          secondary: '#10131e',
          tertiary: '#151929',
          elevated: '#1a1f30',
          card: '#1c2135',
          border: '#252d45',
          hover: '#252d45',
        },
        // Accent for odds / live
        live: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
        muted: '#6b7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        'gradient-dark': 'linear-gradient(180deg, #151929 0%, #0a0d14 100%)',
        'gradient-card': 'linear-gradient(135deg, #1c2135 0%, #151929 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'glow-brand': '0 0 20px rgba(249, 115, 22, 0.3)',
        'glow-live': '0 0 12px rgba(239, 68, 68, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
