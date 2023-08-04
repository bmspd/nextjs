import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectIsPasswordNeedSet } from '@/store/reducers/ProfileSlice/selectors'
import { Fade, Typography } from '@mui/material'
import React from 'react'

import styles from '../../styles.module.scss'
import ChangePassword from './ChangePassword'
import SetPassword from './SetPassword'
const ManagePassword = () => {
  const isPasswordNeedSet = useTypedSelector(selectIsPasswordNeedSet)
  return (
    <MainBlock className={styles.block}>
      <div className={styles.blockHeader}>
        <Typography variant="h5">Manage password</Typography>
      </div>
      <div className={styles.blockMain}>
        {isPasswordNeedSet ? (
          <Fade key="set-pass" appear={true} in={isPasswordNeedSet}>
            <div>
              <SetPassword />
            </div>
          </Fade>
        ) : (
          <Fade key="change-pass" appear={true} in={!isPasswordNeedSet}>
            <div>
              <ChangePassword />
            </div>
          </Fade>
        )}
      </div>
    </MainBlock>
  )
}

export default ManagePassword
