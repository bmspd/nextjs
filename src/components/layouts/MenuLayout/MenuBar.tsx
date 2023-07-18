'use client'
import React from 'react'
import styles from './styles.module.scss'
import { MenuList } from '@mui/material'
import DefaultMenuItem from '@/components/MenuItem/DefaultMenuItem'
const menuItems = [
  { title: 'Projects' },
  { title: 'Unknown link 1' },
  { title: 'Unknown link 2' },
  { title: 'Unknown link 3' },
]
const MenuBar: React.FC = () => {
  return (
    <div className={styles.menuBar}>
      <MenuList disablePadding>
        {menuItems.map((item) => (
          <DefaultMenuItem
            key={item.title}
            sx={{ paddingLeft: 0.5, marginLeft: -0.5 }}
            ListItemTextProps={{ primary: item.title }}
          />
        ))}
      </MenuList>
    </div>
  )
}

export default MenuBar
