import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { login, loginByToken, signUp } from './asyncThunks'

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
        // вопрос, это должно быть в теле asyncThunk или тут?
        localStorage.setItem('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
        state.isAuth = true
      })
      .addCase(login.rejected, () => {
        console.log('REJECTED!')
      })
      .addCase(loginByToken.fulfilled, (state, action) => {
        state.isAuth = true
        console.log(action)
      })
      .addCase(signUp.fulfilled, () => {
        console.log('FULFILLED')
      })
      .addCase(signUp.rejected, (state, action) => {
        console.log('rejected', action)
      }),
})
export const { setAuthState } = AuthSlice.actions
export default AuthSlice.reducer
