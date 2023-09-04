'use client'

import { ThemeMode } from '@/store/reducers/InterfaceSlice/InterfaceSlice'
import { red } from '@mui/material/colors'
import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material/styles'
import { lightMode } from './light-theme'
import { darkMode } from './dark-theme'
const { palette } = createTheme()

const defaultPallete: PaletteOptions = {
  mainColor: palette.augmentColor({
    color: {
      main: red[400],
    },
    name: 'mainColor',
  }),
}
const theme = (mode: ThemeMode) =>
  createTheme(
    {
      palette: {
        ...defaultPallete,
        ...(mode === 'dark' ? darkMode : lightMode),
      },
      components: {
        MuiDialog: {
          styleOverrides: {
            paper: {
              minWidth: 600,
              maxWidth: 800,
            },
          },
        },
      },
    },
    {} as ThemeOptions
  )
export default theme
