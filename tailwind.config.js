/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '25': '6.25rem', // Custom spacing for mb-25
      },
      colors: {
        'portfolio': {
          bg: 'rgb(var(--background-start-rgb))',
          'bg-end': 'rgb(var(--background-end-rgb))',
          fg: 'rgb(var(--foreground-rgb))',
        },
      },
    },
  },
  plugins: [require("daisyui")],
}
