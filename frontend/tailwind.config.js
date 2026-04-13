/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium color palette
        primary: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d5ff',
          300: '#a3b9ff',
          400: '#7a94ff',
          500: '#5166f5',
          600: '#3d4ed6',
          700: '#2e3ab8',
          800: '#2a3499',
          900: '#24287a',
        },
        secondary: {
          50: '#ecf8fb',
          100: '#d4eff7',
          200: '#a8dfef',
          300: '#7ccde4',
          400: '#51b8d7',
          500: '#2ea5ca',
          600: '#2588b0',
          700: '#1f6b8f',
          800: '#1d5573',
          900: '#1a445c',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      boxShadow: {
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'premium-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5166f5 0%, #2ea5ca 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #2ea5ca 0%, #f59e0b 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
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
  plugins: [],
}
