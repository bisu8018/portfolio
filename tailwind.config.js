/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard','Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'Pretendard', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const font = theme('fontFamily.heading').join(', ');
      addUtilities({
        '.font-heading': {
          'font-family': font,
        }
      });
    }
  ]
}