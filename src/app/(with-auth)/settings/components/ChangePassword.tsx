import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectIsPasswordNeedSet } from '@/store/reducers/ProfileSlice/selectors'
import { Typography } from '@mui/material'
import React from 'react'

import styles from '../styles.module.scss'
const ChangePassword = () => {
  const isPasswordNeedSet = useTypedSelector(selectIsPasswordNeedSet)
  return (
    <MainBlock className={styles.block}>
      <div className={styles.blockHeader}>
        <Typography variant="h5">Manage password</Typography>
      </div>
      <div className={styles.blockMain}>
        CHANGE PASS
        {JSON.stringify(isPasswordNeedSet)}
      </div>
    </MainBlock>
  )
}

export default ChangePassword
