'use client'

import React, { useEffect } from 'react'
import styles from './Login.module.scss'
import { Button, TextField } from '@mui/material'
import { useTypedDispatch } from '../../hooks/typedStoreHooks'
import { login } from '../../store/reducers/AuthSlice/asyncThunks'
import $api from '../../http'
import AuthService from '../../http/services/AuthService'

const Login = () => {
  const dispatch = useTypedDispatch()
  return (
    <div className={styles.login}>
      <TextField label="Username" variant="outlined" />
      <TextField label="Password" variant="outlined" />
      <Button
        variant="contained"
        onClick={() =>
          dispatch(
            login({ username: 'second@email.ru', password: 'asdasdasd' })
          )
        }
      >
        Log in
      </Button>
    </div>
  )
}

export default Login
