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
  logo: null | ProjectLogo
}
export type ProjectLogo = {
  id: number
  original_name: string
  imgSource?: string | null
}
export type CreateProjectBody = Omit<IProject, 'id' | 'logo'> & { image?: File }
export type DeleteProjectBody = Pick<IProject, 'id'>
export type GetProjectLogoBody = Pick<IProject, 'id'>
export default class ProjectsService {
  static async createProject(data: CreateProjectBody): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>('/projects', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
  static async deleteProject(data: DeleteProjectBody): Promise<AxiosResponse> {
    return $api.delete<AxiosResponse>(`/projects/${data.id}`)
  }
  static async getProjects() {
    return $api.get<IProject[]>('/projects/personal')
  }
  static async getProjectLogo(data: GetProjectLogoBody): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>(`/projects/${data.id}/logo`, { responseType: 'blob' })
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
