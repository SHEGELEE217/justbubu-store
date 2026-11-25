// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'justbubu-purple': '#4B0B56', // The deep purple from your logo
        'justbubu-gold': '#D4AF37',   // The gold from your logo
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'], 
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}