import { ERRORS } from '@/constants/global.constants'
import { authConfig } from 'config/auth'
import { getServerSession } from 'next-auth'

export type ServerSideReqData = {
  url: string
  tags?: string[]
  cache?: RequestCache
}
const refreshToken = async (refreshToken: string): Promise<string> => {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_BACKEND_BASEURL
  const url = `${baseURL}/auth/refresh`
  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
  const data = await result.json()
  return data?.accessToken
}
type TServerSideRequest = <T>(
  data: ServerSideReqData
) => Promise<{ serialized: T; response: Response }>
export const serverSideRequest: TServerSideRequest = async (data) => {
  const session = await getServerSession(authConfig)
  const baseURL = process.env.NEXT_PUBLIC_SERVER_BACKEND_BASEURL
  const url = `${baseURL}/${data.url}`
  const reqData = await fetch(url, {
    next: { tags: data.tags },
    cache: data.cache,
    headers: { Authorization: `Bearer ${session?.tokens?.accessToken}` },
  })
  if (reqData.ok)
    return {
      serialized: await reqData.json(),
      response: reqData,
    }
  if (reqData.status === 401) {
    const rToken = session?.tokens?.refreshToken
    if (!rToken) throw new Error(ERRORS.ANAUTHORIZED)
    const newToken = await refreshToken(rToken)
    const newReqData = await fetch(url, {
      next: { tags: data.tags },
      cache: data.cache,
      headers: { Authorization: `Bearer ${newToken}` },
    })
    if (!newReqData.ok) throw new Error(ERRORS.ANAUTHORIZED)
    return {
      serialized: await newReqData.json(),
      response: newReqData,
    }
  } else if (reqData.status === 404) {
    throw new Error(ERRORS.NOT_FOUND)
  } else {
    throw new Error(ERRORS.DEFAULT)
  }
}
