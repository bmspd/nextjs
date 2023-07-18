import React from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  MenuItem,
  MenuItemProps,
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface DefaultMenuItemProps extends Omit<MenuItemProps, 'children'> {
  ListItemTextProps?: ListItemTextProps
}

const DefaultMenuItem = React.forwardRef<HTMLLIElement, DefaultMenuItemProps>((props, ref) => {
  const { ListItemTextProps } = props
  return (
    <MenuItem ref={ref} {...props}>
      <ListItem disablePadding>
        <ListItemIcon>
          <AccountCircleIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText {...ListItemTextProps} />
      </ListItem>
    </MenuItem>
  )
})
DefaultMenuItem.displayName = 'DefaultMenuItem'
export default DefaultMenuItem
