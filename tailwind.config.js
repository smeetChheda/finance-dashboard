/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {},
    colors: {
      'white': '#F8F9FA',
      'white-2': '#E9ECEF',
      'white-3': '#DEE2E6',
      'gray-light': '#CED4DA',
      'gray-light-2': '#ADB5BD',
      'gray-dark': '#6C757D',
      'gray-dark-2': '#495057',
      'gray-dark-3': '#343a40',
      'black': '#212529',
    }
  },
  plugins: [],
  darkMode: 'class'
}
