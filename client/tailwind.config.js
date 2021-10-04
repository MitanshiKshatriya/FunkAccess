module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      'fontLogo':[ 'Dancing Script', 'cursive'],
      'domine':['Domine', 'serif'],
      // 'mono': ['ui-monospace','monospace'],
      // 'sans':['Apple Color Emoji','sans'],
      // 'serif':['Cambria']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
