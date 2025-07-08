/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
      },
      colors: {
        desaturatedDarkCyan: 'hsl(180, 29%, 50%)',
        lightGrayishCyan: 'hsl(180, 52%, 96%)',
        lightGrayishCyanFilter: 'hsl(180, 31%, 95%)',
        darkGrayishCyan: 'hsl(180, 8%, 52%)',
        veryDarkGrayishCyan: 'hsl(180, 14%, 20%)',
      },
    },
  },
  plugins: [],
};
