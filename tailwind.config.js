/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          light: '#38bdf8',
          DEFAULT: '#0284c7',
          dark: '#0369a1',
          deep: '#0c4a6e',
          abyss: '#082f49',
          surface: '#e0f2fe',
        },
        gold: {
          light: '#fde047',
          DEFAULT: '#eab308',
          dark: '#ca8a04',
          shadow: '#854d0e',
        },
        voyager: {
          light: '#f87171',
          DEFAULT: '#dc2626',
          dark: '#991b1b',
          glow: '#ef4444',
        },
        explorer: {
          light: '#60a5fa',
          DEFAULT: '#2563eb',
          dark: '#1e40af',
          glow: '#3b82f6',
        },
        nautical: {
          wood: '#854d0e',
          woodDark: '#451a03',
          sand: '#fef3c7',
          cream: '#fffbeb',
          brass: '#d97706',
        }
      },
      fontFamily: {
        nautical: ['"Fredoka"', '"Nunito"', 'system-ui', 'sans-serif'],
        display: ['"Lilita One"', '"Fredoka"', 'cursive', 'sans-serif'],
      },
      animation: {
        'bob-slow': 'bob 3s ease-in-out infinite',
        'bob-delayed': 'bob 3.2s ease-in-out infinite 1.5s',
        'wave-flow': 'waveFlow 8s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-1.5deg)' },
        },
        waveFlow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
      boxShadow: {
        'nautical-button': '0 6px 0 #ca8a04, 0 10px 20px rgba(0,0,0,0.25)',
        'nautical-button-pressed': '0 2px 0 #ca8a04, 0 4px 10px rgba(0,0,0,0.2)',
        'red-button': '0 6px 0 #991b1b, 0 10px 20px rgba(220,38,38,0.3)',
        'blue-button': '0 6px 0 #1e40af, 0 10px 20px rgba(37,99,235,0.3)',
        'card-nautical': '0 12px 30px -5px rgba(12, 74, 110, 0.25), 0 4px 6px -2px rgba(12, 74, 110, 0.1)',
      }
    },
  },
  plugins: [],
};
