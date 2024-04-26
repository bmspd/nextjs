'use client'

import React, { useEffect } from 'react'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import DefaultLoader from '../Loaders/DefaultLoader'
import LoginView from '../LoginView/LoginView'
import { useSession } from 'next-auth/react'
import { setAuthState } from '@/store/reducers/AuthSlice/AuthSlice'
import { setProfile } from '@/store/reducers/ProfileSlice/ProfileSlice'
import { setAccessToken } from '@/http'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useTypedDispatch()
  // at every render next-auth fetching to nextjs server, idk if it's okay :(
  const session = useSession()
  useEffect(() => {
    if (session.status === 'authenticated') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { accessToken, refreshToken, ...rest } = session.data.user
      setAccessToken(accessToken)
      dispatch(setAuthState(true))
      // id becomes a string somehow insilde next-auth, so should cast it to number
      dispatch(setProfile({ ...rest, id: +rest.id }))
    }
  }, [session.status])
  if (session.status === 'loading') return <DefaultLoader />
  if (session.status === 'unauthenticated') return <LoginView />
  return <>{children}</>
}

export default AuthLayout
