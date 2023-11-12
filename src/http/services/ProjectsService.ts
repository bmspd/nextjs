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
  pattern_type: PROJECT_PATTERN_TYPES | null
  pattern_color: PROJECT_PATTERN_COLORS | null
}
export enum PROJECT_PATTERN_TYPES {
  PLANTS = 'plants',
}
export enum PROJECT_PATTERN_COLORS {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}
export type ProjectLogo = {
  id: number
  original_name: string
  imgSource?: string | null
}
export type CreateProjectBody = Omit<IProject, 'id' | 'logo' | 'pattern_type' | 'pattern_color'> & {
  image?: File
} & Partial<Pick<IProject, 'pattern_color' | 'pattern_type'>>
export type DeleteProjectBody = Pick<IProject, 'id'>
export type InviteUserToProjectBody = { email: string }
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
  static async inviteUserToProject(projectId: string | number, data: InviteUserToProjectBody) {
    return $api.patch(`/projects/${projectId}/invite`, data)
  }
}
