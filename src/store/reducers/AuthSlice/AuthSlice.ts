import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { login } from './asyncThunks'

type InitialAuthState = {
  isAuth: boolean
}

const initialState: InitialAuthState = {
  isAuth: false,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
        state.isAuth = true
      })
      .addCase(login.rejected, () => {
        console.log('REJECTED!')
      }),
})
export const { setAuthState } = AuthSlice.actions
export default AuthSlice.reducer
