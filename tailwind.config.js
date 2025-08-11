/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'glass-sparkle': 'glass-sparkle 2.2s infinite linear',
        'fade-in': 'fade-in 180ms cubic-bezier(0.4,0,0.2,1)',
        'fade-out': 'fade-out 180ms cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        'glass-sparkle': {
          '0%':   { background: 'linear-gradient(120deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.00) 60%)', opacity: '0.7' },
          '50%':  { background: 'linear-gradient(120deg,rgba(255,255,255,0.32) 20%,rgba(255,255,255,0.00) 80%)', opacity: '1' },
          '100%': { background: 'linear-gradient(120deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0.00) 60%)', opacity: '0.7' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'none' },
          '100%': { opacity: '0', transform: 'translateY(-8px)' },
        },
      },
    },
  },
}