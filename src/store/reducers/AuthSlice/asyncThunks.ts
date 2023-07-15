import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService, {
  LoginRequestBody,
  SignUpRequestBody,
} from '../../../http/services/AuthService'
import { tryCatch } from '../../../decorators'
import { setProfile } from '../ProfileSlice/ProfileSlice'

export const login = createAsyncThunk(
  'auth/login',
  tryCatch(async (data: LoginRequestBody) => {
    const response = await AuthService.login(data)
    return response.data
  })
)

export const loginByToken = createAsyncThunk('auth/loginByToken', async (arg, { dispatch }) => {
  const response = await AuthService.loginByToken()
  const { profile, ...rest } = response.data
  const formattedProfile = {
    ...rest,
    firstName: profile.first_name,
    secondName: profile.second_name,
    emailVerified: profile.email_verified,
  }
  await dispatch(setProfile(formattedProfile))
  return response.data
})

export const signUp = createAsyncThunk(
  'auth/signup',
  tryCatch(async (data: SignUpRequestBody) => {
    const response = await AuthService.signUp(data)
    return response.data
  })
)
