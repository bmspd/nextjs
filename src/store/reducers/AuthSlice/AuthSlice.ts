import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, loginByToken } from './asyncThunks'

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
    resetStore: () => {
      // eslint-disable-next-line
      console.log('reseting session data...')
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        // вопрос, это должно быть в теле asyncThunk или тут?
        localStorage.setItem('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
        state.isAuth = true
      })
      .addCase(loginByToken.fulfilled, (state) => {
        state.isAuth = true
      }),
})
export const { setAuthState, resetStore } = AuthSlice.actions
export default AuthSlice.reducer
