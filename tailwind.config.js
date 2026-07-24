/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          light: '#D97706',
          dark: '#FCD34D',
        },
        // Secondary colors
        secondary: {
          light: '#92400E',
          dark: '#FBD34D',
        },
        // Accent colors
        accent: {
          light: '#F59E0B',
          dark: '#FCD34D',
        },
        // Background colors
        bg: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        // Text colors
        text: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
        // Surface colors
        surface: {
          light: '#F9FAFB',
          dark: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
