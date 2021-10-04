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
    },
    minWidth:{
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    minHeight:{
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full':'100%',
      '90': '90vh',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
