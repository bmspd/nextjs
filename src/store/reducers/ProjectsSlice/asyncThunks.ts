import { tryCatch } from '@/decorators'
import ProjectsService, {
  CreateProjectBody,
  DeleteProjectBody,
  GetProjectByIdParams,
  GetProjectLogoBody,
  IProject,
  IUserInProjectWithPagination,
  UpdateProjectBody,
} from '@/http/services/ProjectsService'
import TasksService, {
  ICreateTaskBody,
  ITaskWithPagination,
  IUpdateTaskBody,
} from '@/http/services/TaskService'
import { IdType } from '@/types/common'
import { PaginationParams } from '@/types/pagination'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createProject = createAsyncThunk(
  'projects/createProject',
  tryCatch<CreateProjectBody, Omit<IProject, 'logo'> & { logo_id?: number }>(async (data) => {
    const response = await ProjectsService.createProject(data)
    return response.data
  })
)

export const getProjectById = createAsyncThunk(
  'projects/getProjectById',
  tryCatch<GetProjectByIdParams>(async (data) => {
    const response = await ProjectsService.getProjectById(data)
    return response.data
  })
)
export const getTaskByProjectById = createAsyncThunk(
  'projects/getTaskByProjectById',
  tryCatch<{ projectId: IdType; taskId: IdType }>(async (data) => {
    const response = await TasksService.getTaskById(+data.projectId, +data.taskId)
    return response.data
  })
)
export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  tryCatch<DeleteProjectBody>(async (data) => {
    const response = await ProjectsService.deleteProject(data)
    return response.data
  })
)
export const getProjectLogo = createAsyncThunk(
  'projects/getProjectLogo',
  tryCatch<GetProjectLogoBody, string | null>(async (data) => {
    const response = await ProjectsService.getProjectLogo(data)
    if (response.status === 204) return null
    const file = new File([response.data], `logo-${data.id}`, {
      type: response.headers['content-type'],
    })
    return URL.createObjectURL(file)
  })
)
export const getTasksByProject = createAsyncThunk(
  'projects/getTasksByProject',
  tryCatch<{ projectId: IdType; params: PaginationParams }, ITaskWithPagination>(async (data) => {
    const response = await ProjectsService.getTasksByProject(data.projectId, data.params)
    return response.data
  })
)

export const createTask = createAsyncThunk(
  'projects/createTask',
  tryCatch<{ projectId: IdType; body: ICreateTaskBody }>(async (data) => {
    const response = await TasksService.createNewTask(data.projectId, data.body)
    return response.data
  })
)

export const deleteTask = createAsyncThunk(
  'projects/deleteTask',
  tryCatch<{ projectId: IdType; taskId: IdType }>(async (data) => {
    const response = await TasksService.deleteTask(data.projectId, data.taskId)
    return response.data
  })
)

export const updateTask = createAsyncThunk(
  'projects/updateTask',
  tryCatch<{ projectId: IdType; taskId: IdType; data: IUpdateTaskBody }>(
    async ({ projectId, taskId, data }) => {
      const response = await TasksService.updateTask(projectId, taskId, data)
      return response.data
    }
  )
)

export const getUsersByProject = createAsyncThunk(
  'projects/getUsersByProject',
  tryCatch<
    { projectId: IdType; params: PaginationParams; timestamp?: number },
    IUserInProjectWithPagination
  >(async (data) => {
    const response = await ProjectsService.getUsersByProject(data.projectId, data.params)
    if (response?.data?.meta && data.timestamp) {
      response.data.meta.refetch = { timestamp: data.timestamp }
    }
    return response.data
  })
)
export const getUsersForTableByProject = createAsyncThunk(
  'projects/getUsersForTableByProject',
  tryCatch<{ projectId: IdType; params: PaginationParams }, IUserInProjectWithPagination>(
    async (data) => {
      const response = await ProjectsService.getUsersByProject(data.projectId, data.params)
      return response.data
    }
  )
)
export const inviteUserToProject = createAsyncThunk(
  'projects/inviteUserToProject',
  tryCatch<{ projectId: IdType; email: string }>(async (data) => {
    const response = await ProjectsService.inviteUserToProject(data.projectId, {
      email: data.email,
    })
    return response.data
  })
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  tryCatch<{ projectId: IdType; data: UpdateProjectBody }>(async (data) => {
    const response = await ProjectsService.updateProject(data.projectId, data.data)
    return response.data
  })
)

export const quitProject = createAsyncThunk(
  'projects/quitProject',
  tryCatch<{ projectId: IdType }>(async (data) => {
    const response = await ProjectsService.quitProject(data.projectId)
    return response.data
  })
)
