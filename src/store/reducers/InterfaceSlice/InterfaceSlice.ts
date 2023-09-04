import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type ThemeMode = 'dark' | 'light'
type InitialInterfaceState = {
  menuBar: {
    collapsed: boolean
  }
  mode: ThemeMode
}

const initialState: InitialInterfaceState = {
  menuBar: {
    collapsed: false,
  },
  mode: 'light',
}

const InterfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setMenuBarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.menuBar.collapsed = action.payload
    },
    toggleMenuBarCollapsed: (state) => {
      state.menuBar.collapsed = !state.menuBar.collapsed
    },
    toggleMode: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
    },
  },
})

export const { setMenuBarCollapsed, toggleMenuBarCollapsed, toggleMode } = InterfaceSlice.actions
export default InterfaceSlice.reducer
