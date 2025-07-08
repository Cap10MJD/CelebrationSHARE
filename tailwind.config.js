/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Color Palette
        primary: '#80636a', // Deep mauve for buttons, headers, navigation
        secondary: '#e5c6c2', // Dusty rose for accents, highlights, call-to-action elements
        background: '#f6e2e2', // Light blush for page backgrounds and cards
        text: '#0d0d0d', // Dark text for body text and descriptions
        accent: '#be8e89', // Rose taupe for links, icons, and secondary actions
        
        // Extended shades for better design flexibility
        mauve: {
          50: '#faf8f9',
          100: '#f4f0f1',
          200: '#e9dfe1',
          300: '#d9c8cc',
          400: '#c4a8af',
          500: '#a88891',
          600: '#80636a', // Primary
          700: '#6b5359',
          800: '#5a464b',
          900: '#4d3d41',
          950: '#2a2024',
        },
        rose: {
          50: '#fdf9f8',
          100: '#fbf2f1',
          200: '#f7e5e3',
          300: '#f0d1ce',
          400: '#e5c6c2', // Secondary
          500: '#d4a8a3',
          600: '#be8e89', // Accent
          700: '#a67570',
          800: '#8a625e',
          900: '#735450',
          950: '#3e2a28',
        },
        taupe: {
          50: '#f9f9f8',
          100: '#f2f2f0',
          200: '#e4e4e0',
          300: '#d1d1cb',
          400: '#b8b8b0',
          500: '#a1a79a',
          600: '#8a8f82',
          700: '#73776a',
          800: '#5f6258',
          900: '#4f5149',
          950: '#282a26',
        },
      },
    },
  },
  plugins: [],
};