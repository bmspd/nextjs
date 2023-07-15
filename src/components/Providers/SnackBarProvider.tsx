'use client'
import React from 'react'
import { SnackbarProvider } from 'notistack'
import useNotifier from '../../hooks/useNotifier'
import { SNACKBAR_COMPONENTS } from '../Snackbars/Snackbars'
const UseNotifierHookLayout = () => {
  useNotifier()
  return null
}

const SnackBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      Components={SNACKBAR_COMPONENTS}
      disableWindowBlurListener={true}
      autoHideDuration={4000}
    >
      <UseNotifierHookLayout />
      {children}
    </SnackbarProvider>
  )
}
export default SnackBarProvider
