import { createAsyncThunk } from '@reduxjs/toolkit'
import { tryCatch } from '@/decorators'
import UserService from '@/http/services/UserService'
export const deleteYourSelf = createAsyncThunk(
  'user/deleteYourSelf',
  tryCatch(async () => {
    const response = await UserService.deleteYourSelf()
    return response.data
  })
)
