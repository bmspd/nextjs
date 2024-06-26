import { TASK_PRIORITIES, TASK_STATUSES } from '@/constants/tasks.constants'
import { AxiosResponse } from 'axios'
import $api from '..'
import { IProject } from './ProjectsService'
import { DataWithPagination, PaginationParams } from '@/types/pagination'
export type IUser = {
  id: number
  username: string
  email?: string
}
export interface ITask {
  id: number
  title: string
  description?: string | null
  status: TASK_STATUSES
  priority: TASK_PRIORITIES
  createdAt: string
  updatedAt: string
  creator: IUser
  executor: IUser | null
  project: IProject
}
export type ICreateTaskBody = Pick<ITask, 'title' | 'description' | 'status' | 'priority'> & {
  executor_id?: number | null
}
export type IUpdateTaskBody = Partial<ICreateTaskBody>
export type ICreateTaskForm = Pick<ITask, 'title' | 'description' | 'status' | 'priority'> & {
  executor?: {
    id?: number
  } | null
}
export type GetTasksParams = { status?: string } & PaginationParams
export type ITaskWithPagination = DataWithPagination<ITask>
export default class TasksService {
  static async getAllTasksByProject(projectId: number): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>(`/projects/${projectId}/tasks`)
  }
  static async createNewTask(
    projectId: number | string,
    data: ICreateTaskBody
  ): Promise<AxiosResponse> {
    return $api.post<AxiosResponse>(`/projects/${projectId}/tasks`, data)
  }
  static async deleteTask(
    projectId: number | string,
    taskId: number | string
  ): Promise<AxiosResponse> {
    return $api.delete<AxiosResponse>(`/projects/${projectId}/tasks/${taskId}`)
  }

  static async getTaskById(projectId: number, taskId: number) {
    return $api.get<ITask>(`/projects/${projectId}/tasks/${taskId}`)
  }

  static async updateTask(
    projectId: number | string,
    taskId: number | string,
    data: IUpdateTaskBody
  ) {
    return $api.patch<ITask>(`/projects/${projectId}/tasks/${taskId}`, data)
  }
}
