import { RootState } from '../../index'

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth
