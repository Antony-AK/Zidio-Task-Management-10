/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        base: 'Poppins',
        main: 'Inter',
        logo:'Cinzel',
      },
      colors: {
        "orange": "#FFA500",
        "black": "#000",
        "white": "#fff",
        "lightOrange": "#f7c287",
        "lightase": "#F5F5F5",
        "lightred": "#FEB4B4",
        "lightgreen": "#9CFFB3",
        "darkase": "#DCDEDE",

        
        "transition": "all 0.5s ease",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

