/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6e8f0',
          100: '#b8bdd1',
          200: '#8a92b2',
          300: '#5c6793',
          400: '#2e3c74',
          500: '#1a2557',
          600: '#151d45',
          700: '#0f1533',
          800: '#0a0d22',
          900: '#050611',
        },
        electric: {
          50: '#e6f3ff',
          100: '#b3d9ff',
          200: '#80bfff',
          300: '#4da5ff',
          400: '#1a8bff',
          500: '#0071e6',
          600: '#005ab3',
          700: '#004380',
          800: '#002c4d',
          900: '#00151a',
        },
        primary: {
          50: '#e6e8f0',
          100: '#b8bdd1',
          200: '#8a92b2',
          300: '#5c6793',
          400: '#2e3c74',
          500: '#1a2557',
          600: '#151d45',
          700: '#0f1533',
          800: '#0a0d22',
          900: '#050611',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
