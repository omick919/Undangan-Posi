import Hero from './src/components/Hero';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Tangerine"', 'cursive'],
        arabic: ['"Amiri"', 'serif'],
      },
      backgroundImage: {
        'leaf-pattern': "url('/src/assets/leaf-background.png')",
      }
    },
  },
  plugins: [],
};