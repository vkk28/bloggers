/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color' : '#34495E',
       //'primary-color' :'#73AFD2',
        'secondary-color' : '#05c3ff',
        'highlight-color' : '#F8F8FF',
        'hover-color' : '#0058e0',
        'header-hover-color': '#589bff',
         'bgcolor':"#DAE0E6",
        //'text-color' : '#373234',
      },
      width: {
        '96': '24rem', 
        '112': '32rem',
        '128': '40rem',
           },
      height: {
        '96': '24rem',
        '112': '32rem',
        '128': '40rem',
       },
    },
  },
  plugins: [],
}