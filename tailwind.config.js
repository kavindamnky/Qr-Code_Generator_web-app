/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f6fc',
          100: '#e1ecf8',
          200: '#b9daf2',
          300: '#7cbbe8',
          400: '#3999db',
          500: '#147ec9',
          600: '#00519d', // User requested base blue color
          700: '#004282',
          800: '#03376b',
          900: '#092f58',
          950: '#061e3b',
        },
      },
      boxShadow: {
        'brand': '0 10px 25px -5px rgba(0, 81, 157, 0.2), 0 8px 10px -6px rgba(0, 81, 157, 0.1)',
        'brand-lg': '0 20px 30px -10px rgba(0, 81, 157, 0.25)',
      },
    },
  },
  plugins: [],
};
