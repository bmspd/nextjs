import { AxiosResponse } from 'axios'
import $api from '..'

export default class UserService {
  static async deleteYourSelf(): Promise<AxiosResponse> {
    return $api.delete<AxiosResponse>('/user')
  }
}
