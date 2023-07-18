import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import { signOut } from 'next-auth/react'
import React from 'react'
import { DropDownOption } from '@/components/DropDown'

export const userOptions: DropDownOption[] = [
  {
    element: (
      <ListItem disablePadding>
        <ListItemIcon>
          <AccountCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    ),
    href: 'profile',
  },
  {
    element: (
      <ListItem disablePadding>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    ),
    href: 'settings',
  },
  { divider: true },
  {
    element: (
      <ListItem disablePadding>
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </ListItem>
    ),
    onClickHandler: async () => signOut({ redirect: false }),
    onEndClose: false,
  },
]
