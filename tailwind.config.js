/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", "./src/App.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

