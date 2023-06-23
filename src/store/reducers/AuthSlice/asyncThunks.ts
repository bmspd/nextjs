import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService, {
  LoginRequestBody,
  SignUpRequestBody,
} from '../../../http/services/AuthService'
import { tryCatch } from '../../../decorators'

export const login = createAsyncThunk('auth/login', async (data: LoginRequestBody) => {
  const response = await AuthService.login(data)
  return response.data
})

export const signUp = createAsyncThunk(
  'auth/signup',
  tryCatch(async (data: SignUpRequestBody) => {
    const response = await AuthService.signUp(data)
    return response.data
  })
)
