import { AxiosResponse } from 'axios'
import $api from '..'

export type CreatePasswordRequestBody = {
  password: string
}

export type ChangePasswordRequestBody = {
  password: string
  new_password: string
}
export default class UserService {
  static async deleteYourSelf(): Promise<AxiosResponse> {
    return $api.delete<AxiosResponse>('/user')
  }
  static async createPassword(data: CreatePasswordRequestBody): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/user/password', data)
  }

  static async changePassword(data: ChangePasswordRequestBody): Promise<AxiosResponse> {
    return $api.patch<AxiosResponse>('/user/password', data)
  }
}
