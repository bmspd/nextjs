import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sendVerificationLink, updateProfile } from './asyncThunks'

export type InitialProfileState = {
  emailVerified: boolean
  linkSent: string | null
  firstName: string | null
  secondName: string | null
  username: string
  email: string
}
const initialState: InitialProfileState = {
  emailVerified: false,
  linkSent: null,
  firstName: null,
  secondName: null,
  username: '',
  email: '',
}

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, { payload }: PayloadAction<InitialProfileState>) => {
      const keys = Object.keys(payload) as (keyof InitialProfileState)[]
      keys.forEach((key) => {
        if (state[key] === undefined && payload[key] !== undefined) delete payload[key]
      })
      return { ...state, ...payload }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(updateProfile.fulfilled, (state, action) => {
        const profile = action.meta.arg
        const newState = {
          ...(profile.first_name !== undefined && { firstName: profile.first_name }),
          ...(profile.second_name !== undefined && { secondName: profile.second_name }),
        }
        return { ...state, ...newState }
      })
      .addCase(sendVerificationLink.fulfilled, (state, action) => {
        const { payload } = action
        state.linkSent = payload.link_sent
      }),
})

export const { setProfile } = ProfileSlice.actions
export default ProfileSlice.reducer
