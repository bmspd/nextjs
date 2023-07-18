'use client'

import React from 'react'
import styles from './styles.module.scss'
import { Avatar } from '@mui/material'
import DropDown from '../../DropDown'
import { Z_INDEX } from '@/constants/global.constants'
import { userOptions } from '@/components/layouts/MenuLayout/userOptions'

const MenuHeader = () => {
  return (
    <header className={styles.menuHeader} style={{ zIndex: Z_INDEX.HEADER }}>
      <div className={styles.menuHeaderContent}>
        <div>LEFT SIDE</div>
        <div className={styles.headerProfile}>
          <DropDown
            control={<Avatar sx={{ width: 50, height: 50 }}>A</Avatar>}
            options={userOptions}
          />
        </div>
      </div>
    </header>
  )
}

export default MenuHeader
