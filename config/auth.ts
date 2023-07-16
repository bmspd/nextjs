/* eslint-disable @typescript-eslint/no-non-null-assertion*/
import { AuthOptions, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import $api from '@/http'
import axios, { AxiosError } from 'axios'

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      async profile(profile, token) {
        const googleUser = await axios.post(
          process.env.NEXT_PUBLIC_BACKEND_BASEURL + '/auth/login/google',
          {
            email: profile.email,
            first_name: profile.given_name,
            second_name: profile.family_name,
          }
        )
        return { ...profile, ...token, id: profile.sub, ...googleUser.data }
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
          const user = await axios.post(process.env.NEXT_PUBLIC_BACKEND_BASEURL + '/auth/login', {
            username: credentials.username,
            password: credentials.password,
          })
          return {
            ...user.data.user,
            refreshToken: user.data.refreshToken,
            accessToken: user.data.accessToken,
          } as User
        } catch (e) {
          const error = e as AxiosError<{ errors?: Record<string, string> }>
          const errorMsg = error?.response?.data?.errors?.['server-error'] ?? 'Something went wrong'
          throw new Error(errorMsg)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //todo logger в next, типы
      if (user) {
        token.user = { ...user }
      } else if (token.user) {
        const userFromToken = token.user
        const tokens = {
          accessToken: userFromToken.accessToken ?? userFromToken?.tokens?.accessToken,
          refreshToken: userFromToken.refreshToken ?? userFromToken?.tokens?.refreshToken,
        }
        const serverUser = await $api.get(process.env.NEXT_PUBLIC_BACKEND_BASEURL + '/auth/login', {
          headers: {
            Authorization: `Bearer ${tokens.accessToken}`,
            'server-side-refresh': tokens.refreshToken,
            'server-side-access': tokens.accessToken,
          },
        })
        const reqHeaders = serverUser.request.getHeaders()
        token.user = {
          data: { ...serverUser.data },
          tokens: {
            accessToken: reqHeaders?.['server-side-access'],
            refreshToken: reqHeaders?.['server-side-refresh'],
          },
        }
      }
      return token
    },
    async session({ token }) {
      const userFromToken = token.user
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { profile, password, ...rest } = userFromToken.data
      const formattedProfile = {
        ...rest,
        firstName: profile.first_name,
        secondName: profile.second_name,
        emailVerified: profile.email_verified,
        accessToken: userFromToken.accessToken,
        refreshToken: userFromToken.refreshToken,
      }
      return { ...formattedProfile, tokens: userFromToken.tokens }
    },
  },
  // при внутренней ошибке или при переходе с /api/auth/signin -> появляется callbackURL
  // хз как убрать
  pages: {
    signIn: '/',
  },
}
