'use client'

import * as React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { NextAppDirEmotionCacheProvider } from './EmotionCache'

import theme from './theme'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectMode } from '@/store/reducers/InterfaceSlice/selectors'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const mode = useTypedSelector(selectMode)
  return (
    <React.Fragment>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={theme(mode)}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </React.Fragment>
  )
}
