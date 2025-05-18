/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        display: [
          'Poppins',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      colors: {
        // Minimalist theme
        minimalist: {
          primary: '#0F172A',
          secondary: '#475569',
          accent: '#3B82F6',
          background: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
        },
        // Colorful theme
        colorful: {
          primary: '#8B5CF6',
          secondary: '#EC4899',
          accent: '#F59E0B',
          background: '#F5F3FF',
          surface: '#FFFFFF',
          border: '#DDD6FE',
        },
        // Retro theme
        retro: {
          primary: '#B45309',
          secondary: '#854D0E',
          accent: '#059669',
          background: '#FFFBEB',
          surface: '#FEF3C7',
          border: '#FDE68A',
        },
        // Dark theme
        dark: {
          primary: '#E2E8F0',
          secondary: '#94A3B8',
          accent: '#3B82F6',
          background: '#0F172A',
          surface: '#1E293B',
          border: '#334155',
        },
      },
      keyframes: {
        countdown: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        countdown: 'countdown 0.5s ease-out forwards',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.3s ease-out',
        pulse: 'pulse 2s infinite',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover'],
      translate: ['group-hover'],
      scale: ['group-hover', 'hover'],
    },
  },
  plugins: [],
};