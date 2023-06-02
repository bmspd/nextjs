'use client'

import React from 'react'
import styles from './Login.module.scss'
import { Button, TextField } from '@mui/material'

const Login = () => {
  return (
    <div className={styles.login}>
      <TextField label="Username" variant="outlined" />
      <TextField label="Password" variant="outlined" />
      <Button variant="contained">Log in</Button>
    </div>
  )
}

export default Login
