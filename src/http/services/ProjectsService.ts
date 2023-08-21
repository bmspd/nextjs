import { AxiosResponse } from 'axios'
import $api from '..'
import { DataWithPagination, PaginationParams } from '@/types/pagination'

export interface IUserInProject {
  id: number
  email: string
  username: string
}
export type IUserInProjectWithPagination = DataWithPagination<IUserInProject>
export interface IProject {
  id: number
  name: string
}
export type CreateProjectBody = Omit<IProject, 'id'>
export default class ProjectsService {
  static async createProject(data: CreateProjectBody): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/projects', data)
  }
  static async getTasksByProject(
    projectId: string | number,
    params: PaginationParams
  ): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>(`/projects/${projectId}/tasks`, { params: params })
  }
  static async getUsersByProject(
    projectId: string | number,
    params: PaginationParams
  ): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>(`/projects/${projectId}/users`, { params: params })
  }
}
