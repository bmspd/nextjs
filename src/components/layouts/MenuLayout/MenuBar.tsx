'use client'
import React from 'react'
import styles from './styles.module.scss'
import { MenuList } from '@mui/material'
import DefaultMenuItem from '@/components/MenuItem/DefaultMenuItem'
import cn from 'classnames'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectMenuBarCollapsed } from '@/store/reducers/InterfaceSlice/selectors'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
const menuItems = [
  { title: '', iconComponent: <HomeRoundedIcon fontSize="large" />, href: '.' },
  { title: 'Projects', iconComponent: <AccountCircleIcon fontSize="large" />, href: 'projects' },
  { title: 'Unknown link 1', iconComponent: <AccountCircleIcon fontSize="large" /> },
  { title: 'Unknown link 2', iconComponent: <AccountCircleIcon fontSize="large" /> },
  { title: 'Unknown link 3', iconComponent: <AccountCircleIcon fontSize="large" /> },
]
const MenuBar: React.FC = () => {
  const collapsed = useTypedSelector(selectMenuBarCollapsed)
  return (
    <div className={cn(styles.menuBar, collapsed && styles.menuBarCollapsed)}>
      <MenuList disablePadding>
        {menuItems.map((item) => (
          <DefaultMenuItem
            key={item.title}
            sx={{ paddingLeft: 0.5, marginLeft: -0.5 }}
            ListItemTextProps={{ primary: item.title }}
            iconComponent={item.iconComponent}
            href={item.href}
          />
        ))}
      </MenuList>
    </div>
  )
}

export default MenuBar
