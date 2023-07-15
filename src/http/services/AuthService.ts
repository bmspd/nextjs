import $api from '../index'
import { AxiosResponse } from 'axios'

export type LoginRequestBody = {
  username: string
  password: string
}
export type SignUpRequestBody = {
  email?: string | null
  password?: string | null
  username?: string | null
  first_name?: string | null
  second_name?: string | null
}
export default class AuthService {
  static async login(data: LoginRequestBody): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/auth/login', data)
  }
  static async loginByToken(): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>('/auth/login')
  }
  static async signUp(data: SignUpRequestBody) {
    return $api.post<AxiosResponse>('/auth/signup', data)
  }
}
