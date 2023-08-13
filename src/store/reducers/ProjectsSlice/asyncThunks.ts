import { tryCatch } from '@/decorators'
import ProjectsService, { CreateProjectBody, IProject } from '@/http/services/ProjectsService'
import { ITaskWithPagination } from '@/http/services/TaskService'
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
