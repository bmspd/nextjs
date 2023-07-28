import { AxiosResponse } from 'axios'
import $api from '..'

export type UpdateProfileReqBody = {
  first_name?: string | null
  second_name?: string | null
}

export default class ProfileService {
  static async update(data: UpdateProfileReqBody): Promise<AxiosResponse> {
    return $api.patch<AxiosResponse>('/user/profile', data)
  }
  static async sendVerificationLink(): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>('user/profile/email-verify')
  }
}
