import { RootState } from '../../index'
import { InitialProfileState } from './ProfileSlice'

export const selectProfile = (state: RootState): InitialProfileState => state.profile
export const selectLinkSent = (state: RootState) => {
  const linkSent = selectProfile(state).linkSent
  if (linkSent) return new Date(linkSent)
  return null
}
export const selectIsEmailVerified = (state: RootState) => selectProfile(state).emailVerified
