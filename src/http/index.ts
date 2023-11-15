import axios from 'axios'

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
})

$api.defaults.withCredentials = true
$api.interceptors.request.use((config) => {
  config.headers.Authorization =
    config.headers.Authorization ?? `Bearer ${localStorage.getItem('accessToken')}`
  return config
})
$api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // for server-side token refreshing
    const serverSideRefreshToken =
      error.request?.getHeaders && error.request?.getHeaders()?.['server-side-refresh']
    if (
      error.response?.status === 401 &&
      (serverSideRefreshToken || localStorage.getItem('refreshToken'))
    ) {
      let apiResponse
      try {
        apiResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/auth/refresh`, {
          headers: {
            Authorization: `Bearer ${
              serverSideRefreshToken || localStorage.getItem('refreshToken')
            }`,
          },
        })
      } catch (e) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
        }
        throw e
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', apiResponse.data.accessToken)
        localStorage.setItem('refreshToken', apiResponse.data.refreshToken)
      }
      error.config.headers['Authorization'] = `Bearer ${apiResponse?.data?.accessToken}`
      if (typeof window === 'undefined') {
        error.config.headers['server-side-access'] = apiResponse.data.accessToken
      }
      return axios(error.config)
    } else return Promise.reject(error)
  }
)

export default $api
