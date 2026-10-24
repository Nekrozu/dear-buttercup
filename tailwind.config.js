/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fff8f2', ivory: '#f8efe7', blush: '#f6d9d8', rose: '#c98291',
        peach: '#f3c7b7', lavender: '#ddd5e8', ink: '#4a3532', honey: '#f0ca79',
        sage: '#b7c4a8', faded: '#8a716b'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        sans: ['DM Sans', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        paper: '0 15px 55px rgba(87, 55, 51, .11)',
        photo: '0 15px 42px rgba(65, 45, 43, .19)',
      },
    },
  },
  plugins: [],
};
