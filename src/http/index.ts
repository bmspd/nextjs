import axios from 'axios'
import { getCsrfToken, getSession } from 'next-auth/react'

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
})

export const setAccessToken = (token: string) => {
  $api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

$api.defaults.withCredentials = true
$api.interceptors.request.use(async (config) => {
  return config
})
$api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const session = await getSession()

      if (session) {
        try {
          const response = await axios.get<{ accessToken: string; refreshToken: string }>(
            `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/auth/refresh`,
            {
              headers: {
                Authorization: `Bearer ${session?.user?.refreshToken}`,
              },
            }
          )
          const { accessToken, refreshToken } = response.data
          // this route triggers jwt callback with trigger="update"
          await axios.post(`${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/session`, {
            csrfToken: await getCsrfToken(),
            data: { refreshToken, accessToken },
          })
          setAccessToken(accessToken)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return axios(originalRequest)
        } catch (e) {}
      }
    } else return Promise.reject(error)
  }
)

export default $api
