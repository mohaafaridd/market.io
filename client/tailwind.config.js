module.exports = {
  theme: {

    screens: {
      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
    },

    extend: {
      colors: {
        main: '#2C3E50',
        primary: '#34495E',
      }
    }
  },
  variants: {},
  plugins: [],
}
