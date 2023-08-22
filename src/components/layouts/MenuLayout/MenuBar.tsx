'use client'
import React from 'react'
import styles from './styles.module.scss'
import { MenuList } from '@mui/material'
import DefaultMenuItem from '@/components/MenuItem/DefaultMenuItem'
import cn from 'classnames'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectMenuBarCollapsed } from '@/store/reducers/InterfaceSlice/selectors'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded'
const menuItems = [
  { title: '', iconComponent: <HomeRoundedIcon fontSize="large" />, href: '.' },
  {
    title: 'Projects',
    iconComponent: <FormatListBulletedRoundedIcon fontSize="large" />,
    href: 'projects',
  },
  { title: 'Notes', iconComponent: <PushPinRoundedIcon fontSize="large" /> },
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
