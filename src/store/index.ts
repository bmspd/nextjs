import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { loadingMiddleware } from './middlewares/loadingMiddleware'
import AuthSlice, { resetStore } from './reducers/AuthSlice/AuthSlice'
import InterfaceSlice from './reducers/InterfaceSlice/InterfaceSlice'
import LoadingSlice from './reducers/LoadingSlice/LoadingSlice'
import ModalSlice from './reducers/ModalSlice/ModalSlice'
import NotificationsSlice from './reducers/NotificationsSlice/NotificationsSlice'
import ProfileSlice from './reducers/ProfileSlice/ProfileSlice'
import ProjectSlice from './reducers/ProjectsSlice/ProjectSlice'
import UserSlice from './reducers/UserSlice/UserSlice'
import { useStore } from 'react-redux'

const rootReducer = combineReducers({
  auth: AuthSlice,
  notifications: NotificationsSlice,
  profile: ProfileSlice,
  projects: ProjectSlice,
  user: UserSlice,
  loading: LoadingSlice,
  interface: InterfaceSlice,
  modal: ModalSlice,
})

const reducerProxy = (state: RootState | undefined, action: AnyAction) => {
  // reset full store
  if (action.type === resetStore.type) {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

export const store = configureStore({
  reducer: reducerProxy,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // don't know ho to do better with centralized dynamic modal, then to turn off check :(
      serializableCheck: {
        ignoredActions: ['modal/openModal'],
        ignoredPaths: ['modal'],
      },
    }).prepend(loadingMiddleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
export const makeStore = () => store
export type AppStore = ReturnType<typeof makeStore>
export const useAppStore: () => AppStore = useStore
