module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      'fontLogo':[ 'Dancing Script', 'cursive'],
      'domine':['Domine', 'serif'],
      sans: ['Questrial', 'sans-serif'],
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
      '60': '60vh',
      '90': '90vh',
      '30': '20vh' 
    },
    maxWidth:{
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full':'100%',
      '90': '90vh',
    },
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      pink: {
        lightest: '#FBCFE8',
        lighter:'#F9A8D4',
        light: '#F472B6',
        DEFAULT: '#EC4899',
        dark: '#DB2777',
        darker: '#BE185D',
        darkest: '#831843'
      },
      purple:{
        DEFAULT: '#6B21A8',
        light: '#EDE9FE'
      },
      red: {
        DEFAULT: '#EF4444'
    },
      blue: {
        DEFAULT: '#132e48',
        light: '#E0E7FF'
      },
      yellow: {
        DEFAULT: '#e8bc10',
        light: '#FEF3C7'
      },
      green: {
        DEFAULT: '#056947',
      },
      brown: {
        light: '#ae4700',
        DEFAULT: '#802e0e',
        dark: '#802e0e',
      },
      gray: {
        darkest: '#1f2d3d',
        dark: '#3c4858',
        DEFAULT: '#c0ccda',
        light: '#e0e6ed',
        lightest: '#f9fafc',
      },
      white: {
        DEFAULT: '#FFFFFF',
      }
    },
    boxShadow: {
      DEFAULT: '0px 0px 30px  rgba(106, 38, 137,0.6);',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
