'use client'

import React, { useEffect, useState } from 'react'
import { Switch, Typography } from '@mui/material'
import { selectIsAuth } from '../store/reducers/AuthSlice/selectors'
import { setAuthState } from '../store/reducers/AuthSlice/AuthSlice'
import { useTypedDispatch, useTypedSelector } from '../hooks/typedStoreHooks'

export default function Home() {
  const isAuth = useTypedSelector(selectIsAuth)
  const dispatch = useTypedDispatch()
  const [toggle, setToggle] = useState(true)
  return (
    <div className={'container'}>
      <Typography variant={'h3'}>Main Page</Typography>
      <h1
        style={{ cursor: 'pointer' }}
        onClick={() => {
          dispatch(setAuthState(!isAuth))
          setToggle((prevState) => {
            return !prevState
          })
        }}
      >
        {toggle ? 'HELLO' : 'BYE'}
      </h1>
      <h1>{isAuth.toString()}</h1>
      <Switch
        checked={toggle}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setToggle(event.target.checked)
        }}
      />
      <Switch defaultChecked color="error" />
    </div>
  )
}
