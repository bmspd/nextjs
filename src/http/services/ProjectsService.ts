import { AxiosResponse } from 'axios'
import $api from '..'
export interface IProject {
  id: number
  name: string
}
export type CreateProjectBody = Omit<IProject, 'id'>
export default class ProjectsService {
  static async createProject(data: CreateProjectBody): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/projects', data)
  }
}
