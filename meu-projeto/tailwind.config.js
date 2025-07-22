/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ffb3', // Vortex Green
        secondary: '#00d1a0', // Energy Teal
        cosmic: '#0c0f12', // Cosmic Black
        surface: '#161b1f', // Deep Void
        accent: '#b3ffe7', // Luminous Mint
        'text-primary': '#e4e4e4', // Soft White
        'text-secondary': '#a5a5a5', // Fog Gray
        alert: '#00ffff', // Radiant Cyan
      },
    },
  },
  plugins: [],
}
