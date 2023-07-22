import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialInterfaceState = {
  menuBar: {
    collapsed: boolean
  }
}

const initialState: InitialInterfaceState = {
  menuBar: {
    collapsed: false,
  },
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
  },
})

export const { setMenuBarCollapsed, toggleMenuBarCollapsed } = InterfaceSlice.actions
export default InterfaceSlice.reducer
