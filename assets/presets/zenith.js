import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const JanJansenPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef7f3',
      100: '#fdede6',
      200: '#fbd8cc',
      300: '#f7bba8',
      400: '#f19174',
      500: '#ec5827',
      600: '#dd4a1f',
      700: '#b83d1a',
      800: '#94341b',
      900: '#792f1b',
      950: '#42170c'
    },
    surface: {
      0: '#0d0d0d',
      50: '#1a1a1a',
      100: '#202020',
      200: '#2a2a2a',
      300: '#353535',
      400: '#404040',
      500: '#505050',
      600: '#606060',
      700: '#707070',
      800: '#808080',
      900: '#909090',
      950: '#a0a0a0'
    },
    colorScheme: {
      light: {
        primary: {
          color: 'rgb(236, 88, 39)',
          contrastColor: '#ffffff',
          hoverColor: 'rgb(221, 74, 31)',
          activeColor: 'rgb(184, 61, 26)'
        },
        secondary: {
          color: 'rgb(189, 120, 82)',
          contrastColor: '#ffffff',
          hoverColor: 'rgb(169, 100, 62)',
          activeColor: 'rgb(149, 80, 42)'
        },
        highlight: {
          background: '#fef7f3',
          focusBackground: '#fdede6',
          color: 'rgb(184, 61, 26)',
          focusColor: 'rgb(148, 52, 27)'
        }
      },
      dark: {
        primary: {
          color: 'rgb(236, 88, 39)',
          contrastColor: '#ffffff',
          hoverColor: 'rgb(247, 187, 168)',
          activeColor: 'rgb(241, 145, 116)'
        },
        secondary: {
          color: 'rgb(189, 120, 82)',
          contrastColor: '#ffffff',
          hoverColor: 'rgb(209, 140, 102)',
          activeColor: 'rgb(229, 160, 122)'
        },
        surface: {
          0: '#0d0d0d',
          50: '#1a1a1a',
          100: '#202020',
          200: '#2a2a2a',
          300: '#353535',
          400: '#404040',
          500: '#505050',
          600: '#606060',
          700: '#707070',
          800: '#808080',
          900: '#909090',
          950: '#a0a0a0'
        },
        highlight: {
          background: 'rgba(236, 88, 39, 0.16)',
          focusBackground: 'rgba(236, 88, 39, 0.24)',
          color: 'rgba(236, 88, 39, 0.87)',
          focusColor: 'rgba(236, 88, 39, 0.87)'
        }
      }
    }
  }
})

export default JanJansenPreset
