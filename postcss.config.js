/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'architects-daughter': ['"Architects Daughter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
