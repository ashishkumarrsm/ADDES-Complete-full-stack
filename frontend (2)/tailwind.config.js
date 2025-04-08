/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 10s linear infinite',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg) scale(10)' },
          '100%': { transform: 'rotate(-360deg) scale(10)' },
        },
      },



      animation: {
        'move-bg': 'move 4s linear infinite',
      },
      keyframes: {
        move: {
          '0%': { backgroundPosition: '0 0' },
          '50%': { backgroundPosition: '20px 20px' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      boxShadow: {
        glow: '0 0 10px #ff6347, 0 0 20px #ff1493, 0 0 30px #8a2be2, 0 0 40px #00bfff',
        'glow-hover': '0 0 20px #ff6347, 0 0 30px #ff1493, 0 0 40px #8a2be2, 0 0 50px #00bfff',
      },



    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
}
