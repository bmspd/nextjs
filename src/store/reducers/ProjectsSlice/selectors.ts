import { ITask } from '@/http/services/TaskService'
import { RootState } from '@/store'
import { IdType } from '@/types/common'
//import { createSelector } from '@reduxjs/toolkit'

// export const selectProjects = createSelector(
//   (state: RootState) => state.projects.projects,
//   (projects) => Object.values(projects)
// )
export const selectProjects = (state: RootState) => state.projects.projects

export const selectProject = (id: number) => (state: RootState) =>
  selectProjects(state).find((project) => project.id === id)

export const selectProjectLogos = (state: RootState) => state.projects.logos

export const selectProjectLogo = (id: number) => (state: RootState) => state.projects.logos[id]

export const selectTasksByProject = (id: number) => (state: RootState) =>
  state.projects.tasksByProject[id]

export const selectUsersByProject = (id: number) => (state: RootState) =>
  state.projects.usersByProject[id]
export const selectUsersForTableByProject = (id: IdType) => (state: RootState) =>
  state.projects.usersForTableByProjectId[id]
export const selectProjectById = (id: number) => (state: RootState) =>
  state.projects.projectsById[id]

export const selectTaskByProjectById =
  (projectId: number, taskId: number) =>
  (state: RootState): ITask | undefined =>
    state.projects.tasksByProjectById[projectId]?.[taskId]
