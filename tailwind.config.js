/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'opacity': 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'hover-up': 'hover-up 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'footer-bar': 'footer-bar 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'footer-circle': 'footer-circle 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'work-cell': 'work-cell 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        opacity: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.9' },
        },
        'hover-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-4px)' },
        },
        'footer-bar': {
          '0%': { paddingTop: '4rem', height: '5rem' },
          '100%': { paddingTop: '3rem', height: '5rem' },
        },
        'footer-circle': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(0.5rem)', opacity: '0' },
        },
        'work-cell': {
          '0%': { transform: 'translateY(0)', boxShadow: 'none' },
          '100%': { 
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
          },
        },
      },
      colors: {
        background: {
          light: '#FDF8F5',
          dark: '#111827'
        },
        primary: {
          100: '#EEF3F0',
          200: '#DEE7E0',
          300: '#CDDCD1',
          400: '#BDD0C1',
          500: '#ACC4B2',
          600: '#8A9D8E',
          700: '#67766B',
          800: '#454E47',
          900: '#222724',
        },
        neutral: {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        'cooperbt': ['Fraunces', 'serif'],
        'tthovespro': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 