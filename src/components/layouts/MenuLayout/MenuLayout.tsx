'use client'
import React from 'react'
import MenuHeader from './MenuHeader'
import MenuBar from '@/components/layouts/MenuLayout/MenuBar'
import styles from './styles.module.scss'
import { Box } from '@mui/material'
const MenuLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <MenuHeader />
      <div className={styles.menuAndMain}>
        <MenuBar />
        <Box sx={{ backgroundColor: (theme) => theme.palette.background.default }} component="main">
          {children}
        </Box>
      </div>
    </>
  )
}

export default MenuLayout
