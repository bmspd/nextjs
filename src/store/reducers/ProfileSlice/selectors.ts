import { RootState } from '../../index'
import { InitialProfileState } from './ProfileSlice'

export const selectProfile = (state: RootState): InitialProfileState => state.profile
