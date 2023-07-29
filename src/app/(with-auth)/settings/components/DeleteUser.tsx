'use client'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { signOut } from '@/store/reducers/AuthSlice/asyncThunks'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { deleteYourSelf } from '@/store/reducers/UserSlice/asyncThunks'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { Button, Typography } from '@mui/material'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/navigation'
import React from 'react'

import styles from '../styles.module.scss'
const DeleteUser = () => {
  const nextRouter = useRouter()
  const dispatch = useTypedDispatch()
  const signOutAndRedirect = () =>
    dispatch(signOut({ redirect: false, callbackUrl: '/' }))
      .unwrap()
      .then((res) => nextRouter.push(res.url))
  return (
    <MainBlock className={styles.block}>
      <div className={styles.blockHeader}>
        <Typography variant="h5">Delete your account</Typography>
      </div>
      <div className={styles.blockMain}>
        <Button
          onClick={() => {
            dispatch(deleteYourSelf())
              .unwrap()
              .then((res) => {
                signOutAndRedirect()
                dispatch(
                  enqueueSnackbar({
                    message: res.message,
                    options: {
                      key: uniqueId(),
                      variant: SNACKBAR_TYPES.SUCCESS,
                    },
                  })
                )
              })
          }}
          variant="outlined"
        >
          Delete
        </Button>
      </div>
    </MainBlock>
  )
}

export default DeleteUser
