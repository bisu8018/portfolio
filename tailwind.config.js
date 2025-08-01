/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1.2s infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '0.2' },
        },
      },
    },
  },
}