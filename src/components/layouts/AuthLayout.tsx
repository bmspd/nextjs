'use client'

import React, { useEffect, useState } from 'react'
import { selectIsAuth } from '../../store/reducers/AuthSlice/selectors'
import { usePathname } from 'next/navigation'
import { useTypedDispatch, useTypedSelector } from '../../hooks/typedStoreHooks'
import { loginByToken } from '../../store/reducers/AuthSlice/asyncThunks'
import DefaultLoader from '../Loaders/DefaultLoader'
import LoginView from '../LoginView/LoginView'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useTypedSelector(selectIsAuth)
  const dispatch = useTypedDispatch()
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    // todo какой-то хук для лоадинга...
    dispatch(loginByToken()).then(() => setLoading(false))
  }, [])

  if (loading) return <DefaultLoader />
  if (!isAuth && pathname !== '/sign-up') return <LoginView />
  return <>{children}</>
}

export default AuthLayout
