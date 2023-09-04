import { PaletteOptions } from '@mui/material'
import { createColor } from './helpers'
import { THEME } from '@/types/theme-colors'
import colors from '@/styles/colors.module.scss'

export const darkMode: PaletteOptions = {
  mode: 'dark',
  primary: createColor('dark', 'primary'),
  secondary: createColor('dark', 'secondary'),
  success: createColor('dark', 'success'),
  error: createColor('dark', 'error'),
  warning: createColor('dark', 'warning'),
  info: createColor('dark', 'info'),
  background: {
    default: colors[THEME.DARK.BACKGROUND.DEFAULT],
    paper: colors[THEME.DARK.BACKGROUND.PAPER],
  },
}

// const darkMode: PaletteOptions = {
//   mode: 'dark',
//   primary: palette.augmentColor({
//     color: {
//       main: colors[THEME.DARK.PRIMARY.MAIN],
//     }
//   }),
//   background: {
//     default: '#02052b',
//     paper: '#040952'
//   },
//   text: {
//     primary: '#ffffff'
//   },
//   gradient: {
//     main: 'linear-gradient(45deg, #121212 62%, rgba(255,255,255,1) 100%)'
//   }
// }
