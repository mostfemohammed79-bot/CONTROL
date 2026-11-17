/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        default: ['Inter', 'Noto Sans', 'system-ui', 'sans-serif'],
        arabic: ['Noto Kufi Arabic', 'Cairo', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
