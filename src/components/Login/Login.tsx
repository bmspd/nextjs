'use client'

import React from 'react'
import styles from './Login.module.scss'
import { Button, TextField } from '@mui/material'
import { useTypedDispatch, useTypedSelector } from '../../hooks/typedStoreHooks'
import { login } from '../../store/reducers/AuthSlice/asyncThunks'
import { selectNotifications } from '../../store/reducers/NotificationsSlice/selectors'

const Login = () => {
  const dispatch = useTypedDispatch()
  const notifies = useTypedSelector(selectNotifications)
  return (
    <div className={styles.login}>
      {JSON.stringify(notifies)}
      <TextField label="Username" variant="outlined" />
      <TextField label="Password" variant="outlined" />
      <Button
        variant="contained"
        onClick={() =>
          dispatch(login({ username: 'test_creation@mail.ru', password: 'asdasdasd' }))
        }
      >
        Log in
      </Button>
    </div>
  )
}

export default Login
