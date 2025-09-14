/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Untuk teks biasa (serif)
        'body': ['Amiri', 'serif'], 
        
        // Untuk judul (cursive/script)
        'title': ['Tangerine', 'cursive'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar'),],
}
