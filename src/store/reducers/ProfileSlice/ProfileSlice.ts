import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type InitialProfileState = {
  emailVerified: boolean
  firstName: string | null
  secondName: string | null
  username: string
  email: string
}
const initialState: InitialProfileState = {
  emailVerified: false,
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
})

export const { setProfile } = ProfileSlice.actions
export default ProfileSlice.reducer
