/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  plugins: [],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#0182C1'
        },
        red: {
          DEFAULT: '#FF2020'
        },
        black: {
          DEFAULT: '#000000'
        },
        white: {
          DEFAULT: '#FFFFFF'
        }
      }
    }
  }
}
