import { TASK_PRIORITIES, TASK_STATUSES } from '@/constants/tasks.constants'
import { AxiosResponse } from 'axios'
import $api from '..'
import { IProject } from './ProjectsService'
import { DataWithPagination } from '@/types/pagination'
type IUser = {
  id: number
  username: string
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

export type ITaskWithPagination = DataWithPagination<ITask>
export default class TasksService {
  static async getAllTasksByProject(project_id: number): Promise<AxiosResponse> {
    return $api.get<AxiosResponse>(`/projects/${project_id}/tasks`)
  }
}
