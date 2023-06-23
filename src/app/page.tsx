'use client'

import React from 'react'
import { Button } from '@mui/material'
import { selectIsAuth } from '../store/reducers/AuthSlice/selectors'
import { setAuthState } from '../store/reducers/AuthSlice/AuthSlice'
import { useTypedDispatch, useTypedSelector } from '../hooks/typedStoreHooks'
import Link from 'next/link'
import Login from '../components/Login/Login'
export default function Home() {
  const isAuth = useTypedSelector(selectIsAuth)
  const dispatch = useTypedDispatch()
  return (
    <div className="container">
      <Login />
      <Link href="sign-up">Sign up</Link>
      <h1 onClick={() => dispatch(setAuthState(!isAuth))}>{isAuth.toString()}</h1>
      <Link href="logged">
        <Button variant={'contained'}>Click</Button>
      </Link>
    </div>
  )
}
