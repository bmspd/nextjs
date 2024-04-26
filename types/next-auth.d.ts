import { InitialProfileState } from '@/store/reducers/ProfileSlice/ProfileSlice'

type CustomUser = {
  accessToken: string
  refreshToken: string
  id: string
} & Omit<InitialProfileState, 'id'>

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: CustomUser
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    user: CustomUser
  }
}
