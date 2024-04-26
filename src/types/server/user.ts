export type ServerUserDataWithTokens = {
  user: {
    id: number
    username: string
    // no need now
    // deletedAt: null | string
    profile: {
      email_verified: boolean
      link_sent: null | string
      first_name: null | string
      second_name: null | string
    }
  }
  accessToken: string
  refreshToken: string
}
