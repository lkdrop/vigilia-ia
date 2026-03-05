/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light: '#e6c75a',
          dark: '#b8962e',
        },
        dark: {
          900: '#06071a',
          800: '#0a0c24',
          700: '#0d0f2e',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
