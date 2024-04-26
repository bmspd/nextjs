import { auth } from '@/auth'
import { ERRORS } from '@/constants/global.constants'
import { AppTokens } from '@/types/common'

export type ServerSideReqData = {
  url: string
  tags?: string[]
  cache?: RequestCache
  body?: BodyInit | null
  method?: string
  headers?: HeadersInit
}
const refreshTokens = async (
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const baseURL = process.env.NEXT_PUBLIC_SERVER_BACKEND_BASEURL
  const url = `${baseURL}/auth/refresh`
  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  })
  const data = await result.json()
  return { accessToken: data.accessToken, refreshToken: data.refreshToken }
}
type TServerSideRequest = <T>(data: ServerSideReqData) => Promise<{
  serialized: T
  response: Response
  isRefresh?: AppTokens
}>
export const serverSideRequest: TServerSideRequest = async (data) => {
  const session = await auth()
  const baseURL = process.env.NEXT_PUBLIC_SERVER_BACKEND_BASEURL
  const url = `${baseURL}/${data.url}`
  const reqData = await fetch(url, {
    next: { tags: data.tags },
    cache: data.cache,
    headers: { Authorization: `Bearer ${session?.user.accessToken}` },
    body: data.body,
    method: data.method,
  })
  if (reqData.ok)
    return {
      serialized: await reqData.json(),
      response: reqData,
    }
  if (reqData.status === 401) {
    const rToken = session?.user.refreshToken
    if (!rToken) throw new Error(ERRORS.ANAUTHORIZED)
    const { accessToken, refreshToken } = await refreshTokens(rToken)
    const newReqData = await fetch(url, {
      next: { tags: data.tags },
      cache: data.cache,
      headers: { Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
      body: data.body,
      method: data.method,
    })

    if (!newReqData.ok) throw new Error(ERRORS.ANAUTHORIZED)

    return {
      serialized: await newReqData.json(),
      response: newReqData,
      isRefresh: { refreshToken, accessToken },
    }
  } else if (reqData.status === 404) {
    throw new Error(ERRORS.NOT_FOUND)
  } else {
    throw new Error(ERRORS.DEFAULT)
  }
}
