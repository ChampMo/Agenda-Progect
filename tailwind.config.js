/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'glass': '#ffffff60',
        'col1': '#12419C',
        'col2': '#66D5D4',
      },
    }
  },
  plugins: [],
}

