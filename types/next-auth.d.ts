import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { InitialProfileState } from '@/store/reducers/ProfileSlice/ProfileSlice'
import { DefaultJWT, JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends InitialProfileState {
    tokens: { accessToken: string; refreshToken: string }
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
      data?: any
      accessToken?: string
      refreshToken?: sting
      tokens?: {
        accessToken: string
        refreshToken: string
      }
    }
  }
}
