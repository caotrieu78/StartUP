/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // quan trọng để Tailwind scan
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
