'use client'
import React, { useMemo } from 'react'
import styles from './styles.module.scss'
import { Box, MenuList } from '@mui/material'
import DefaultMenuItem from '@/components/MenuItem/DefaultMenuItem'
import cn from 'classnames'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectMenuBarCollapsed } from '@/store/reducers/InterfaceSlice/selectors'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded'
import { usePathname } from 'next/navigation'
import { startsWith } from 'lodash'
const getMenuItems = (pathname: string) => [
  {
    title: '',
    iconComponent: (
      <HomeRoundedIcon color={pathname === '/' ? 'primary' : 'action'} fontSize="large" />
    ),
    href: '.',
  },
  {
    title: 'Projects',
    iconComponent: (
      <FormatListBulletedRoundedIcon
        color={startsWith(pathname, '/projects') ? 'primary' : 'action'}
        fontSize="large"
      />
    ),
    href: 'projects',
  },
  {
    title: 'Notes',
    iconComponent: (
      <PushPinRoundedIcon
        color={startsWith(pathname, '/notes') ? 'primary' : 'action'}
        fontSize="large"
      />
    ),
    href: 'notes',
  },
]
const MenuBar: React.FC = () => {
  const pathname = usePathname()
  const menuItems = useMemo(() => getMenuItems(pathname), [pathname])
  const collapsed = useTypedSelector(selectMenuBarCollapsed)
  return (
    <Box
      sx={{ bgcolor: (theme) => theme.palette.background.default }}
      className={cn(styles.menuBar, collapsed && styles.menuBarCollapsed)}
    >
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
    </Box>
  )
}

export default MenuBar
