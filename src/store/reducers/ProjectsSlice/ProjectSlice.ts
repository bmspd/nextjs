import { IProject } from '@/http/services/ProjectsService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createProject, getTasksByProject } from './asyncThunks'
import { ITaskWithPagination } from '@/http/services/TaskService'
type InitialState = {
  projects: Record<number, IProject>
  tasksByProject: Record<number, ITaskWithPagination>
}
const initialState: InitialState = {
  projects: {},
  tasksByProject: {},
}

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload
    },
    setTasks: (
      state,
      action: PayloadAction<{ project_id: number; tasks: ITaskWithPagination }>
    ) => {
      const { payload } = action
      state.tasksByProject[payload.project_id] = payload.tasks
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createProject.fulfilled, (state, action) => {
        const { payload } = action
        state.projects[payload.id] = payload
      })
      .addCase(getTasksByProject.fulfilled, (state, action) => {
        const { payload, meta } = action
        const projectId = +meta.arg.projectId
        state.tasksByProject[projectId] = payload
      }),
})

export const { setProjects, setTasks } = ProjectsSlice.actions
export default ProjectsSlice.reducer
