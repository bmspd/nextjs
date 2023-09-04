import { PaletteMode } from '@mui/material'

class ColorPalette {
  readonly MAIN: string
  readonly LIGHT: string
  readonly DARK: string
  readonly CONTRAST_TEXT: string
  constructor(mode: PaletteMode, name: string) {
    this.MAIN = `${mode}-${name}-main`
    this.LIGHT = `${mode}-${name}-light`
    this.DARK = `${mode}-${name}-dark`
    this.CONTRAST_TEXT = `${mode}-${name}-contrasttext`
  }
}

class Background {
  readonly DEFAULT: string
  readonly PAPER: string
  constructor(mode: PaletteMode, name: string) {
    this.DEFAULT = `${mode}-${name}-default`
    this.PAPER = `${mode}-${name}-paper`
  }
}

export class THEME_COLORS {
  readonly PRIMARY: ColorPalette
  readonly SECONDARY: ColorPalette
  readonly SUCCESS: ColorPalette
  readonly ERROR: ColorPalette
  readonly WARNING: ColorPalette
  readonly INFO: ColorPalette
  readonly BACKGROUND: Background

  constructor(mode: PaletteMode) {
    this.PRIMARY = new ColorPalette(mode, 'primary')
    this.SECONDARY = new ColorPalette(mode, 'secondary')
    this.SUCCESS = new ColorPalette(mode, 'success')
    this.ERROR = new ColorPalette(mode, 'error')
    this.WARNING = new ColorPalette(mode, 'warning')
    this.INFO = new ColorPalette(mode, 'info')
    this.BACKGROUND = new Background(mode, 'background')
  }
}

export class THEME {
  static readonly LIGHT = new THEME_COLORS('light')
  static readonly DARK = new THEME_COLORS('dark')
}
