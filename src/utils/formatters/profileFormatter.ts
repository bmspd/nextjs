import { ServerUserDataWithTokens } from '@/types/server/user'
import { User } from 'next-auth'

export const formatProfileForSession = (userServerData: ServerUserDataWithTokens) => {
  const { user, accessToken, refreshToken } = userServerData
  const { profile, ...rest } = user
  const formattedProfile = {
    ...rest,
    firstName: profile.first_name,
    secondName: profile.second_name,
    emailVerified: profile.email_verified,
    linkSent: profile.link_sent,
    accessToken,
    refreshToken,
  }
  return formattedProfile as unknown as User
}
