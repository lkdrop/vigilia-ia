/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0F0F1A',
          secondary: '#1A1A2E',
          tertiary: '#16213E',
          elevated: '#1E1E32',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          hover: '#7C3AED',
          light: '#A78BFA',
        },
        border: {
          DEFAULT: '#2A2A3E',
          hover: '#3A3A4E',
        },
        success: '#06D6A0',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        muted: '#6B6B80',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
