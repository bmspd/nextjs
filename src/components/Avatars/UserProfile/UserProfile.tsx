import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded'
import { IconButton, Tooltip, TooltipProps, Typography } from '@mui/material'
import React from 'react'
type UserProfileProps = {
  username?: string
  TooltipProps?: Partial<TooltipProps>
  styles?: React.CSSProperties
}
const UserProfile: React.FC<UserProfileProps> = ({ username, TooltipProps, styles }) => {
  return (
    <Tooltip title={<Typography>{username}</Typography>} placement="top" arrow {...TooltipProps}>
      {username ? (
        <div style={{ display: 'inline-block', ...styles }}>
          <IconButton size="small">
            <AccountCircleRounded fontSize="large" />
          </IconButton>
          {username}
        </div>
      ) : (
        <div>No user chosen</div>
      )}
    </Tooltip>
  )
}

export default UserProfile
