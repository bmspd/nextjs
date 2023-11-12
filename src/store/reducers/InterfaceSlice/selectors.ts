import { RootState } from '@/store'

export const selectMenuBarCollapsed = (state: RootState): boolean =>
  state.interface.menuBar.collapsed
export const selectMode = (state: RootState) => state.interface.mode
export const selectProjectsView = (state: RootState) => state.interface.projects.view
