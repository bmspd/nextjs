'use client'
import { memo, useEffect } from 'react'
import { AppTokens } from '@/types/common'
import { getCsrfToken, useSession } from 'next-auth/react'
import axios from 'axios'
import { setAccessToken } from '@/http'

const TokenRefresher = memo(({ accessToken, refreshToken }: AppTokens) => {
  const session = useSession()
  useEffect(() => {
    if (session.data?.user.accessToken !== accessToken) {
      getCsrfToken()
        .then((csrfToken) =>
          axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/session`, {
            csrfToken,
            data: { refreshToken, accessToken },
          })
        )
        .then(() => setAccessToken(accessToken))
    }
  }, [])
  return null
})

TokenRefresher.displayName = 'TokenRefresher'

export default TokenRefresher
