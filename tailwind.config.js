/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        'creamy-gray': '#D9D9D9',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'zoom-fade-in': 'zoomFadeIn 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        zoomFadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: [],
}

