'use client'
import { LocalStorage } from '@/utils/localStorage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type ThemeMode = 'dark' | 'light'
export type InitialInterfaceState = {
  menuBar: {
    collapsed: boolean
  }
  mode: ThemeMode
}

export const interfaceInitialState: InitialInterfaceState = {
  menuBar: {
    collapsed: false,
  },
  mode: 'light',
}
const initWithLS = (): InitialInterfaceState => {
  return LocalStorage.getInterfaceState()
}
const InterfaceSlice = createSlice({
  name: 'interface',
  initialState: initWithLS(),
  reducers: {
    setMenuBarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.menuBar.collapsed = action.payload
      LocalStorage.setInterfaceValue('menuBar.collapsed', action.payload)
    },
    toggleMenuBarCollapsed: (state) => {
      state.menuBar.collapsed = !state.menuBar.collapsed
      LocalStorage.setInterfaceValue('menuBar.collapsed', state.menuBar.collapsed)
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      LocalStorage.setInterfaceValue('mode', state.mode)
    },
  },
})

export const { setMenuBarCollapsed, toggleMenuBarCollapsed, toggleMode } = InterfaceSlice.actions
export default InterfaceSlice.reducer
