import { RootState } from '@/store'
import { createSelector } from '@reduxjs/toolkit'

export const selectProjects = createSelector(
  (state: RootState) => state.projects.projects,
  (projects) => Object.values(projects)
)
export const selectProject = (id: number) => (state: RootState) => state.projects.projects[id]

export const selectTasksByProject = (id: number) => (state: RootState) =>
  state.projects.tasksByProject[id]
