import { tryCatch } from '@/decorators'
import ProfileService, { UpdateProfileReqBody } from '@/http/services/ProfileService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  tryCatch<UpdateProfileReqBody>(async (data) => {
    const response = await ProfileService.update(data)
    return response.data
  })
)

export const sendVerificationLink = createAsyncThunk(
  'profile/sendVerificationLink',
  tryCatch(async () => {
    const response = await ProfileService.sendVerificationLink()
    return response.data
  })
)
