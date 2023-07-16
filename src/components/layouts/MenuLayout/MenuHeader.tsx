'use client'

import React from 'react'
import styles from './styles.module.scss'
import { Avatar } from '@mui/material'
import DropDown from '../../DropDown'
import { signOut } from 'next-auth/react'
const MenuHeader = () => {
  const promiseFoo = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('i am done!')
        resolve(true)
      }, 2000)
    })
  }
  return (
    <header className={styles.menuHeader}>
      <div style={{ width: '100%', height: '100%' }}>
        <div>LEFT SIDE</div>
        <div className={styles.headerProfile}>
          <DropDown
            control={<Avatar sx={{ width: 56, height: 56 }}>A</Avatar>}
            options={[
              { element: 'First', onClickHandler: promiseFoo, onEndClose: true },
              {
                element: 'Log out',
                onClickHandler: async () => signOut({ redirect: false }),
                onEndClose: false,
              },
            ]}
          />
        </div>
      </div>
    </header>
  )
}

export default MenuHeader
