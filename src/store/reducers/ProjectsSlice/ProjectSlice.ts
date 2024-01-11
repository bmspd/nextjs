import { IProject, IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  createProject,
  deleteTask,
  getProjectById,
  getProjectLogo,
  getTaskByProjectById,
  getTasksByProject,
  getUsersByProject,
  getUsersForTableByProject,
  updateProject,
  updateTask,
} from './asyncThunks'
import { ITask, ITaskWithPagination } from '@/http/services/TaskService'
import { merge } from 'lodash'
import moment from 'moment'
import { IdType } from '@/types/common'
type InitialState = {
  projects: IProject[]
  projectsById: Record<string, IProject>
  usersByProject: Record<number, IUserInProjectWithPagination>
  tasksByProject: Record<number, ITaskWithPagination>
  tasksByProjectById: Record<number, Record<number, ITask>>
  logos: Record<number, { id: number; imgSource: string }>
  preloaded: Record<string, string>
  usersForTableByProjectId: Record<IdType, IUserInProjectWithPagination>
}
const initialState: InitialState = {
  projects: [],
  projectsById: {},
  logos: {},
  usersByProject: {},
  tasksByProject: {},
  preloaded: {},
  tasksByProjectById: {},
  usersForTableByProjectId: {},
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
    setUsersInProject: (
      state,
      action: PayloadAction<{ users: IUserInProjectWithPagination; projectId: IdType }>
    ) => {
      const { payload } = action
      state.preloaded[`users.${payload.projectId}`] = moment().format()
      state.usersForTableByProjectId[payload.projectId] = payload.users
    },
    setTasks: (
      state,
      action: PayloadAction<{ project_id: number; tasks: ITaskWithPagination }>
    ) => {
      const { payload } = action
      state.tasksByProject[payload.project_id] = payload.tasks
    },
    setTaskByProjectById: (state, action: PayloadAction<{ task: ITask; projectId: string }>) => {
      const { task, projectId } = action.payload
      state.preloaded[`project-${projectId}.task-${task.id}`] = moment().format()
      if (!state.tasksByProjectById[+projectId])
        state.tasksByProjectById[+projectId] = { [task.id]: task }
      else state.tasksByProjectById[+projectId][task.id] = task
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
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        const { payload, meta } = action
        state.projectsById[meta.arg.id] = payload
      })
      .addCase(getTaskByProjectById.fulfilled, (state, action) => {
        const { payload, meta } = action
        const projectId = meta.arg.projectId
        const task = payload
        state.preloaded[`project-${projectId}.task-${task.id}`] = moment().format()
        if (!state.tasksByProjectById[+projectId])
          state.tasksByProjectById[+projectId] = { [task.id]: task }
        else state.tasksByProjectById[+projectId][task.id] = task
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { payload, meta } = action
        const { projectId, taskId } = meta.arg
        state.tasksByProjectById[+projectId][+taskId] = {
          ...state.tasksByProject,
          ...payload,
        }
        const taskIndex = state.tasksByProject[+projectId]?.data.findIndex(
          (el) => el.id === +taskId
        )
        if (taskIndex !== undefined) {
          state.tasksByProject[+projectId] = {
            meta: state.tasksByProject[+projectId].meta,
            data: state.tasksByProject[+projectId].data.map((el, index) => {
              if (index === taskIndex) {
                return { ...el, ...payload }
              }
              return el
            }),
          }
        }
      })
      .addCase(getUsersForTableByProject.fulfilled, (state, action) => {
        const { payload, meta } = action
        const { projectId } = meta.arg
        state.usersForTableByProjectId[projectId] = payload
      }),
})

export const {
  setProjects,
  setProjectById,
  setTasks,
  deleteProjectById,
  setTaskByProjectById,
  setUsersInProject,
} = ProjectsSlice.actions
export default ProjectsSlice.reducer
