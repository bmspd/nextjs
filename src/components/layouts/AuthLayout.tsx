'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../store/reducers/AuthSlice/selectors'
import { usePathname } from 'next/navigation'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector(selectIsAuth)
  const pathname = usePathname()
  if (!isAuth && pathname !== '/' && pathname !== '/sign-up') return <>Log in first!</>

  return <>{children}</>
}

export default AuthLayout
