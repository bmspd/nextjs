import { RootState } from '@/store'

export const selectMenuBarCollapsed = (state: RootState): boolean =>
  state.interface.menuBar.collapsed
