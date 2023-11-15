import { IProject, IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createProject,
  deleteTask,
  getProjectLogo,
  getTasksByProject,
  getUsersByProject,
  updateProject,
} from './asyncThunks'
import { ITaskWithPagination } from '@/http/services/TaskService'
import { merge } from 'lodash'
import moment from 'moment'
type InitialState = {
  projects: IProject[]
  projectsById: Record<string, IProject>
  usersByProject: Record<number, IUserInProjectWithPagination>
  tasksByProject: Record<number, ITaskWithPagination>
  logos: Record<number, { id: number; imgSource: string }>
  preloaded: Record<string, string>
}
const initialState: InitialState = {
  projects: [],
  projectsById: {},
  logos: {},
  usersByProject: {},
  tasksByProject: {},
  preloaded: {},
}

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.preloaded['projects'] = moment().format()
      state.projects = action.payload
    },
    setProjectById: (state, action: PayloadAction<IProject>) => {
      const project = action.payload
      state.preloaded[`project.${project.id}`] = moment().format()
      state.projectsById[project.id] = action.payload
    },
    deleteProjectById: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload)
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
        state.projects.unshift(payload as IProject)
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
      })
      .addCase(getProjectLogo.fulfilled, (state, action) => {
        const { payload, meta } = action
        if (payload === null) delete state.logos[meta.arg.id]
        else state.logos[meta.arg.id] = { id: meta.arg.id, imgSource: payload }
        // const project = state.projects.find(project => meta.arg.id === project.id)
        // if (project && project.logo) {
        //   project.logo.imgSource = payload
        // }
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { payload, meta } = action
        state.projectsById[meta.arg.projectId] = payload
        state.projects = state.projects.map((project) =>
          project.id === meta.arg.projectId ? { ...project, ...payload } : project
        )
      }),
})

export const { setProjects, setProjectById, setTasks, deleteProjectById } = ProjectsSlice.actions
export default ProjectsSlice.reducer
