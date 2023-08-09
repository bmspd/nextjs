'use client'
import MainBlock from '@/components/Blocks/MainBlock'
import { ConfirmationModal } from '@/components/Modals/ConfirmationModal'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import { signOut } from '@/store/reducers/AuthSlice/asyncThunks'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import { enqueueSnackbar } from '@/store/reducers/NotificationsSlice/NotificationsSlice'
import { deleteYourSelf } from '@/store/reducers/UserSlice/asyncThunks'
import { SNACKBAR_TYPES } from '@/types/notistack'
import { Button, Typography } from '@mui/material'
import { uniqueId } from 'lodash'
import { useRouter } from 'next/navigation'
import React from 'react'

import styles from '../styles.module.scss'
const DeleteUser = () => {
  const applyCb = () =>
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
            dispatch(
              openModal(
                ConfirmationModal({
                  applyCb,
                  text: 'Are you sure want to delete your account?',
                  title: 'Delete account',
                  deleteFunc: 'user/deleteYourSelf',
                })
              )
            )
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
