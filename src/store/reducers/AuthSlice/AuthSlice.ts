import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

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
  extraReducers: (builder => builder)
})
export const { setAuthState } = AuthSlice.actions
export default AuthSlice.reducer
