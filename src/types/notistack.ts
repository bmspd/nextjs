export const SNACKBAR_TYPES = {
  DEFAULT: '_default',
  ERROR: '_error',
  SUCCESS: '_success',
} as const
export type SnackbarCustomVariants = (typeof SNACKBAR_TYPES)[keyof typeof SNACKBAR_TYPES]
declare module 'notistack' {
  interface VariantOverrides {
    [SNACKBAR_TYPES.DEFAULT]: true
    [SNACKBAR_TYPES.ERROR]: true
    [SNACKBAR_TYPES.SUCCESS]: true
    /* example with props*/
    reportComplete: {
      allowDownload: boolean
    }
  }
}
