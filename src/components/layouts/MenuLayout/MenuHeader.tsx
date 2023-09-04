'use client'

import React from 'react'
import styles from './styles.module.scss'
import { Avatar, Box, IconButton } from '@mui/material'
import DropDown from '../../DropDown'
import { Z_INDEX } from '@/constants/global.constants'
import { userOptions } from '@/components/layouts/MenuLayout/userOptions'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { signOut } from '@/store/reducers/AuthSlice/asyncThunks'
import Link from 'next/link'
import { toggleMenuBarCollapsed } from '@/store/reducers/InterfaceSlice/InterfaceSlice'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useRouter } from 'next/navigation'
import { resetStore } from '@/store/reducers/AuthSlice/AuthSlice'
import LightLogo from '/public/assets/images/logo/light_small.svg'
import DarkLogo from '/public/assets/images/logo/dark_small.svg'
import ThemeImage from '@/components/Image/ThemeImage/ThemeImage'
import ThemeSwitcher from '@/components/Switcher/Theme/ThemeSwitcher'

const MenuHeader = React.memo(() => {
  const dispatch = useTypedDispatch()
  const nextRouter = useRouter()
  const logOutHandler = async () => {
    dispatch(signOut({ redirect: false, callbackUrl: '/' }))
      .unwrap()
      .then((res) => {
        nextRouter.push(res.url)
        dispatch(resetStore())
      })
  }
  return (
    <Box
      sx={{ zIndex: Z_INDEX.HEADER, backgroundColor: 'background.default' }}
      component="header"
      className={styles.menuHeader}
    >
      <div className={styles.menuHeaderContent}>
        <div className={styles.contentLeftSide}>
          <IconButton size="small" onClick={() => dispatch(toggleMenuBarCollapsed())}>
            {<DragIndicatorIcon />}
          </IconButton>
          <Link href=".">
            <ThemeImage srcLight={LightLogo} srcDark={DarkLogo} height={40} alt="" />
          </Link>
        </div>
        <div className={styles.contentRightSide}>
          <ThemeSwitcher />
          <DropDown
            control={<Avatar sx={{ width: 50, height: 50 }}>A</Avatar>}
            options={userOptions(logOutHandler)}
          />
        </div>
      </div>
    </Box>
  )
})
MenuHeader.displayName = 'MenuHeader'
export default MenuHeader
