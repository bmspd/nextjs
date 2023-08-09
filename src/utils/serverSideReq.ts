import { ERRORS } from '@/constants/global.constants'
import { authConfig } from 'config/auth'
import { getServerSession } from 'next-auth'

export type ServerSideReqData = {
  url: string
}
const refreshToken = async (refreshToken: string): Promise<string> => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASEURL
  const url = `${baseURL}/auth/refresh`
  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
  const data = await result.json()
  return data?.accessToken
}
export const serverSideRequest = async (data: ServerSideReqData) => {
  const session = await getServerSession(authConfig)
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASEURL
  const url = `${baseURL}/${data.url}`
  const reqData = await fetch(url, {
    headers: { Authorization: `Bearer ${session?.tokens?.accessToken}` },
  })
  if (reqData.ok) return reqData.json()
  if (reqData.status === 401) {
    const rToken = session?.tokens?.refreshToken
    if (!rToken) throw new Error(ERRORS.ANAUTHORIZED)
    const newToken = await refreshToken(rToken)
    const newReqData = await fetch(url, {
      headers: { Authorization: `Bearer ${newToken}` },
    })
    if (!newReqData.ok) throw new Error(ERRORS.ANAUTHORIZED)
    return newReqData.json()
  }
}
