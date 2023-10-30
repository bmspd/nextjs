import { RootState } from '@/store'
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
