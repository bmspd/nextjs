import { tryCatch } from '@/decorators'
import ProjectsService, { CreateProjectBody, IProject } from '@/http/services/ProjectsService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const createProject = createAsyncThunk(
  'projects/createProject',
  tryCatch<CreateProjectBody, IProject>(async (data) => {
    const response = await ProjectsService.createProject(data)
    return response.data
  })
)
