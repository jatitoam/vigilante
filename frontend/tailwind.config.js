/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  plugins: [],
  theme: {
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      blue: {
        DEFAULT: '#009DA7',
        100: '#E6F7F8',
        200: '#C0EAF0',
        300: '#9ADDE8',
        400: '#74D0E0',
        500: '#4EC3D8',
        600: '#28B6D0',
        700: '#009DA7',
        800: '#00807D',
        900: '#006354'
      },
      green: {
        DEFAULT: '#D6DF23',
        100: '#F4F5C0',
        200: '#EDEFA3',
        300: '#E5E985',
        400: '#DEE267',
        500: '#D6DF23',
        600: '#BCC21F',
        700: '#A2A51B',
        800: '#888818',
        900: '#6E6B14'
      },
      purple: {
        DEFAULT: '#652C90',
        100: '#E6D9F0',
        200: '#CDB3E1',
        300: '#B38DCE',
        400: '#9A68BD',
        500: '#652C90',
        600: '#4E216F',
        700: '#3A1950',
        800: '#260F30',
        900: '#12060F'
      },
      gray: {
        DEFAULT: '#E5E5E5',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
      }
    }
  }
}
