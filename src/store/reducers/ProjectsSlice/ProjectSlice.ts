import { IProject, IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createProject, deleteTask, getTasksByProject, getUsersByProject } from './asyncThunks'
import { ITaskWithPagination } from '@/http/services/TaskService'
import { merge } from 'lodash'
type InitialState = {
  projects: Record<number, IProject>
  usersByProject: Record<number, IUserInProjectWithPagination>
  tasksByProject: Record<number, ITaskWithPagination>
}
const initialState: InitialState = {
  projects: {},
  usersByProject: {},
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
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { meta } = action
        state.tasksByProject[+meta.arg.projectId].data = state.tasksByProject[
          +meta.arg.projectId
        ].data.filter((task) => task.id !== +meta.arg.taskId)
      })
      .addCase(getTasksByProject.fulfilled, (state, action) => {
        const { payload, meta } = action
        const projectId = +meta.arg.projectId
        state.tasksByProject[projectId] = payload
      })
      .addCase(getUsersByProject.fulfilled, (state, action) => {
        const { payload, meta } = action
        const projectId = +meta.arg.projectId
        const currentUsers = state.usersByProject[projectId]
        const timestamp = meta.arg.timestamp
        if (!currentUsers || timestamp) state.usersByProject[projectId] = payload
        else if (currentUsers.meta.pagination.page < payload.meta.pagination.page) {
          state.usersByProject[projectId] = {
            data: currentUsers.data.concat(payload.data),
            meta: merge(currentUsers.meta, payload.meta),
          }
        }
      }),
})

export const { setProjects, setTasks } = ProjectsSlice.actions
export default ProjectsSlice.reducer
