/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./src/css/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}