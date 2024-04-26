/* eslint-disable @typescript-eslint/no-non-null-assertion*/
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import axios, { AxiosError } from 'axios'
import { ServerUserDataWithTokens } from '@/types/server/user'
import { formatProfileForSession } from '@/utils/formatters/profileFormatter'
import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export const { unstable_update, auth, handlers, signIn, signOut } = NextAuth({
  // propably because of next-auth beta, sometimes can't read AUTH_SECRET from .env.local
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    GoogleProvider({
      async profile(profile) {
        try {
          const googleUser = await axios.post<ServerUserDataWithTokens>(
            process.env.NEXT_PUBLIC_SERVER_BACKEND_BASEURL + '/auth/login/google',
            {
              email: profile.email,
              first_name: profile.given_name,
              second_name: profile.family_name,
            }
          )
          return formatProfileForSession(googleUser.data)
        } catch (e) {
          const error = e as AxiosError<{ errors?: Record<string, string> }>
          const errorMsg = error?.response?.data?.errors?.['server-error'] ?? 'Something went wrong'
          throw new Error(errorMsg)
        }
      },
    }),
    Credentials({
      credentials: {
        username: { label: 'username', type: 'text', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null
        try {
          const user = await axios.post<ServerUserDataWithTokens>(
            process.env.NEXT_PUBLIC_SERVER_BACKEND_BASEURL + '/auth/login',
            {
              username: credentials.username,
              password: credentials.password,
            }
          )
          return formatProfileForSession(user.data)
        } catch (e) {
          const error = e as AxiosError<{ errors?: Record<string, string> }>
          const errorMsg = error?.response?.data?.errors?.['server-error'] ?? 'Something went wrong'
          throw new Error(errorMsg)
        }
      },
    }),
  ],
  callbacks: {
    async jwt(data) {
      const { token, user, trigger, session } = data

      // manually trigger this at axios interceptors, by calling POST /api/auth/session
      if (trigger === 'update') {
        return { ...token, user: { ...token.user, ...session } }
      }

      // filled user is only available after authorize, that's why it attached to token object
      if (user) {
        return {
          ...token,
          user: { ...user },
        } as unknown as JWT
      }
      return token
    },
    async session({ session, token }) {
      // take user data from token, which was paired with user data from authorize
      if (session) {
        // could not rewrite type for AdapterUser
        ;(session as Session).user = token.user
      }
      return session
    },
  },
  // при внутренней ошибке или при переходе с /api/auth/signin -> появляется callbackURL
  // хз как убрать
  pages: {
    signIn: '/',
  },
})
