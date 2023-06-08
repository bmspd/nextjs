import axios from 'axios'

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASEURL,
})

$api.defaults.withCredentials = true
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})
$api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response.status === 401 && localStorage.getItem('refreshToken')) {
      let apiResponse
      try {
        apiResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}/auth/refresh`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
            },
          }
        )
      } catch (e) {
        /*avoid multiply refresh-token requests*/
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accessToken')
        throw e
      }
      localStorage.setItem('accessToken', apiResponse.data.accessToken)
      localStorage.setItem('refreshToken', apiResponse.data.refreshToken)
      error.config.headers[
        'Authorization'
      ] = `Bearer ${apiResponse.data.accessToken}`
      return axios(error.config)
    } else return Promise.reject(error)
  }
)

export default $api
