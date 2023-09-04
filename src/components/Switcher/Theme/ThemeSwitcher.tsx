'use client'
import { IconButton, useTheme } from '@mui/material'
import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { toggleMode } from '@/store/reducers/InterfaceSlice/InterfaceSlice'
const ThemeSwitcher = () => {
  const mode = useTheme().palette.mode
  const dispatch = useTypedDispatch()
  return (
    <IconButton size="small" onClick={() => dispatch(toggleMode())}>
      {mode === 'light' ? (
        <DarkModeIcon sx={{ fontSize: '28px' }} />
      ) : (
        <LightModeIcon sx={{ fontSize: '28px' }} />
      )}
    </IconButton>
  )
}

export default ThemeSwitcher
