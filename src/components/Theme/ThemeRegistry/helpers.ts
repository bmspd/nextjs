import { PaletteColorOptions, PaletteMode, PaletteOptions, createTheme } from '@mui/material'
import colors from '@/styles/colors.module.scss'
import { THEME } from '@/types/theme-colors'
import { PickByValueExact } from '@/types/utils'
const { palette } = createTheme()

export const createColor = (
  mode: PaletteMode,
  color: keyof PickByValueExact<Required<PaletteOptions>, PaletteColorOptions>
) => {
  const formattedMode = mode.toUpperCase() as Uppercase<PaletteMode>
  const formattedColor = color.toUpperCase() as Uppercase<typeof color>
  return palette.augmentColor({
    color: {
      main: colors[THEME[formattedMode][formattedColor].MAIN],
      dark: colors[THEME[formattedMode][formattedColor].DARK],
      light: colors[THEME[formattedMode][formattedColor].LIGHT],
      contrastText: colors[THEME[formattedMode][formattedColor].CONTRAST_TEXT],
    },
  })
}
