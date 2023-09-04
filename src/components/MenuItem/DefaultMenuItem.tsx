import React from 'react'
import {
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  MenuItemProps,
} from '@mui/material'
import { merge } from 'lodash'
import Link from 'next/link'

interface DefaultMenuItemProps extends Omit<MenuItemProps, 'children'> {
  ListItemTextProps?: ListItemTextProps
  iconComponent?: React.ReactElement
  href?: string
}

const DefaultMenuItem = React.forwardRef<HTMLLIElement, DefaultMenuItemProps>((props, ref) => {
  const { ListItemTextProps, iconComponent, sx, href, ...rest } = props
  return (
    <MenuItem
      href={href ?? ''}
      component={href ? Link : 'li'}
      ref={ref}
      sx={merge({ gap: '24px' }, sx)}
      {...rest}
    >
      <ListItemIcon>{iconComponent}</ListItemIcon>
      <ListItemText
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? theme.palette.text.primary : 'white'),
        }}
        {...ListItemTextProps}
      />
    </MenuItem>
  )
})
DefaultMenuItem.displayName = 'DefaultMenuItem'
export default DefaultMenuItem
