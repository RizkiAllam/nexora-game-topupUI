/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        
        primary: {
          DEFAULT: '#FACC15', // Modern Gaming Yellow (Solid & Terang)
          hover: '#EAB308',   // Yellow sedikit lebih gelap untuk efek hover
          light: '#FEF08A'
        },
        secondary: {
          DEFAULT: '#3B82F6', // Blue tetap dipertahankan untuk variasi jika diperlukan
          hover: '#2563EB',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        }
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'premium': '0 10px 40px -10px rgba(250, 204, 21, 0.3)', // Glow effect kuning
      }
    },
  },
  plugins: [],
}