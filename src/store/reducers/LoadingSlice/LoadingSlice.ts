import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type InitialLoadingState = {
  loading: boolean
  currentLoading: Record<string, number>
}

const initialState: InitialLoadingState = {
  loading: false,
  currentLoading: {},
}

const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      const loadingMethod = action.payload
      if (!state.currentLoading[loadingMethod]) state.currentLoading[loadingMethod] = 1
      else state.currentLoading[loadingMethod]++
      state.loading = true
    },
    endLoading: (state, action: PayloadAction<string>) => {
      const loadingMethod = action.payload
      if (state.currentLoading[loadingMethod] === 1) delete state.currentLoading[loadingMethod]
      else state.currentLoading[loadingMethod]--
      if (!Object.keys(state.currentLoading).length) state.loading = false
    },
  },
})

export const { startLoading, endLoading } = LoadingSlice.actions
export default LoadingSlice.reducer
