import {
  Palette as MuiPallette,
  PaletteOptions as MuiPaletteOptions,
  SimplePaletteColorOptions,
} from '@mui/material/styles'
import { ButtonPropsColorOverrides as MuiButtonColorOverride } from '@mui/material/Button'

declare module '@mui/material/styles' {
  interface Palette extends MuiPallette {
    mainColor?: SimplePaletteColorOptions
    gradient?: SimplePaletteColorOptions
  }
  interface PaletteOptions extends MuiPaletteOptions {
    mainColor?: SimplePaletteColorOptions
    gradient?: SimplePaletteColorOptions
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides extends MuiButtonColorOverride {
    mainColor: true
  }
}
