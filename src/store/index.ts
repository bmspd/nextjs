import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { loadingMiddleware } from './middlewares/loadingMiddleware'
import AuthSlice from './reducers/AuthSlice/AuthSlice'
import InterfaceSlice from './reducers/InterfaceSlice/InterfaceSlice'
import LoadingSlice from './reducers/LoadingSlice/LoadingSlice'
import NotificationsSlice from './reducers/NotificationsSlice/NotificationsSlice'
import ProfileSlice from './reducers/ProfileSlice/ProfileSlice'
import UserSlice from './reducers/UserSlice/UserSlice'

const rootReducer = combineReducers({
  auth: AuthSlice,
  notifications: NotificationsSlice,
  profile: ProfileSlice,
  user: UserSlice,
  loading: LoadingSlice,
  interface: InterfaceSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(loadingMiddleware),
})

export type AppDispatch = typeof store.dispatch
// was <typeof store.getState> but it makes an error with circular references
export type RootState = ReturnType<typeof rootReducer>
//export type AppStore = ReturnType<typeof store>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
//todo need some wrapper for normal ssr state manager work
/*const makeStore = () => store
export const storeWrapper = createWrapper<AppStore>(makeStore)*/
