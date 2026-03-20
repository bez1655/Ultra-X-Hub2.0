/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#ff2d55',
        accent: '#a855f7',
        dark: {
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
        },
      },
    },
  },
  plugins: [],
};
