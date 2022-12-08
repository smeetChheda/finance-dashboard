/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      screens: {
        'md': '1175px',
      },
      
      fontFamily: {
        sans: ['Roboto Mono', 'sans-serif'],
        Orbitron: ['Orbitron', 'sans-serif'],
        anek: ['Anek Odia', 'sans-serif']
      },
    },
    
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
      'green-text': '#50ba6f',
      'blue-1': '#468faf'
    }
  },
  plugins: [],
  darkMode: 'class'
}

