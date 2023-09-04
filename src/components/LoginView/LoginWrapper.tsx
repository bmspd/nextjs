'use client'
import { Box, Paper } from '@mui/material'
import React from 'react'
import ThemeSwitcher from '../Switcher/Theme/ThemeSwitcher'
import styles from './styles.module.scss'

const LoginWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      className={styles.logInWrapper}
      sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}
    >
      <Paper className={styles.logInContainer}>
        <div className={styles.controlPanel}>
          <ThemeSwitcher />
        </div>
        {children}
      </Paper>
    </Box>
  )
}

export default LoginWrapper
