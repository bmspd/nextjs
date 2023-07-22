'use client'

import React from 'react'
import styles from './styles.module.scss'
import { Avatar, Button, IconButton } from '@mui/material'
import DropDown from '../../DropDown'
import { Z_INDEX } from '@/constants/global.constants'
import { userOptions } from '@/components/layouts/MenuLayout/userOptions'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { signOut } from '@/store/reducers/AuthSlice/asyncThunks'
import Link from 'next/link'
import { toggleMenuBarCollapsed } from '@/store/reducers/InterfaceSlice/InterfaceSlice'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
const MenuHeader = React.memo(() => {
  const dispatch = useTypedDispatch()
  const logOutHandler = async () => {
    dispatch(signOut({ redirect: false }))
  }
  return (
    <header className={styles.menuHeader} style={{ zIndex: Z_INDEX.HEADER }}>
      <div className={styles.menuHeaderContent}>
        <div className={styles.contentLeftSide}>
          <IconButton size="small" onClick={() => dispatch(toggleMenuBarCollapsed())}>
            {<DragIndicatorIcon />}
          </IconButton>
          <Link href=".">
            <Button variant="outlined">PLACE FOR LOGO</Button>
          </Link>
        </div>
        <div className={styles.headerProfile}>
          <DropDown
            control={<Avatar sx={{ width: 50, height: 50 }}>A</Avatar>}
            options={userOptions(logOutHandler)}
          />
        </div>
      </div>
    </header>
  )
})
MenuHeader.displayName = 'MenuHeader'
export default MenuHeader
