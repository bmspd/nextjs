import { PaletteOptions } from '@mui/material'
import { grey } from '@mui/material/colors'
import colors from '@/styles/colors.module.scss'
import { THEME } from '@/types/theme-colors'
import { createColor } from './helpers'

export const lightMode: PaletteOptions = {
  mode: 'light',
  primary: createColor('light', 'primary'),
  secondary: createColor('light', 'secondary'),
  success: createColor('light', 'success'),
  error: createColor('light', 'error'),
  warning: createColor('light', 'warning'),
  info: createColor('light', 'info'),
  background: {
    default: colors[THEME.LIGHT.BACKGROUND.DEFAULT],
    paper: colors[THEME.LIGHT.BACKGROUND.PAPER],
  },
  action: {
    active: grey[600],
  },
  gradient: {
    main: 'linear-gradient(45deg, rgba(255,255,255,1) 62%, rgba(0,0,0,1) 100%)',
  },
}
