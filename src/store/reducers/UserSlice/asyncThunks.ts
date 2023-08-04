import { createAsyncThunk } from '@reduxjs/toolkit'
import { tryCatch } from '@/decorators'
import UserService, {
  CreatePasswordRequestBody,
  ChangePasswordRequestBody,
} from '@/http/services/UserService'
import { setProfile } from '../ProfileSlice/ProfileSlice'
export const deleteYourSelf = createAsyncThunk(
  'user/deleteYourSelf',
  tryCatch(async () => {
    const response = await UserService.deleteYourSelf()
    return response.data
  })
)

export const createPassword = createAsyncThunk(
  'user/createPassword',
  tryCatch<CreatePasswordRequestBody>(async (data, thunkApi) => {
    const { dispatch } = thunkApi
    const response = await UserService.createPassword(data)
    dispatch(setProfile({ password: undefined }))
    return response.data
  })
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  tryCatch<ChangePasswordRequestBody>(async (data) => {
    const response = await UserService.changePassword(data)
    return response.data
  })
)
