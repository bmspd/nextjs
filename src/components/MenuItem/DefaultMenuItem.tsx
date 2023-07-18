import React from 'react'
import {
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
  const { ListItemTextProps, ...rest } = props
  return (
    <MenuItem ref={ref} {...rest}>
      <ListItemIcon>
        <AccountCircleIcon fontSize="medium" />
      </ListItemIcon>
      <ListItemText {...ListItemTextProps} />
    </MenuItem>
  )
})
DefaultMenuItem.displayName = 'DefaultMenuItem'
export default DefaultMenuItem
