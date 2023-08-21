import { tryCatch } from '@/decorators'
import ProjectsService, {
  CreateProjectBody,
  IProject,
  IUserInProjectWithPagination,
} from '@/http/services/ProjectsService'
import TasksService, { ICreateTaskBody, ITaskWithPagination } from '@/http/services/TaskService'
import { PaginationParams } from '@/types/pagination'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createProject = createAsyncThunk(
  'projects/createProject',
  tryCatch<CreateProjectBody, IProject>(async (data) => {
    const response = await ProjectsService.createProject(data)
    return response.data
  })
)

export const getTasksByProject = createAsyncThunk(
  'projects/getTasksByProject',
  tryCatch<{ projectId: number | string; params: PaginationParams }, ITaskWithPagination>(
    async (data) => {
      const response = await ProjectsService.getTasksByProject(data.projectId, data.params)
      return response.data
    }
  )
)

export const createTask = createAsyncThunk(
  'projects/createTask',
  tryCatch<{ projectId: number | string; body: ICreateTaskBody }>(async (data) => {
    const response = await TasksService.createNewTask(data.projectId, data.body)
    return response.data
  })
)

export const getUsersByProject = createAsyncThunk(
  'projects/getUsersByProject',
  tryCatch<
    { projectId: number | string; params: PaginationParams; timestamp?: Date },
    IUserInProjectWithPagination
  >(async (data) => {
    const response = await ProjectsService.getUsersByProject(data.projectId, data.params)
    if (response?.data?.meta && data.timestamp) {
      response.data.meta.refetch = { timestamp: data.timestamp }
    }
    return response.data
  })
)
