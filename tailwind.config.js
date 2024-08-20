/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'bounce-1': 'bounce 1s infinite 0.1s',
        'bounce-2': 'bounce 1s infinite 0.2s',
        'bounce-3': 'bounce 1s infinite 0.3s',
      },
    },
  },
  plugins: [],
};
