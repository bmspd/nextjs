'use client'

import React, { useEffect } from 'react'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import DefaultLoader from '../Loaders/DefaultLoader'
import LoginView from '../LoginView/LoginView'
import { useSession } from 'next-auth/react'
import { setAuthState } from '@/store/reducers/AuthSlice/AuthSlice'
import { setProfile } from '@/store/reducers/ProfileSlice/ProfileSlice'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useTypedDispatch()
  const session = useSession()
  useEffect(() => {
    console.log(session)
    if (session.status === 'authenticated') {
      const { tokens, ...rest } = session.data
      dispatch(setAuthState(true))
      dispatch(setProfile(rest))
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
    }
  }, [session])

  if (session.status === 'loading') return <DefaultLoader />
  if (session.status === 'unauthenticated') return <LoginView />
  return <>{children}</>
}

export default AuthLayout
