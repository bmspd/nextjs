import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { loadingMiddleware } from './middlewares/loadingMiddleware'
import AuthSlice, { resetStore } from './reducers/AuthSlice/AuthSlice'
import InterfaceSlice from './reducers/InterfaceSlice/InterfaceSlice'
import LoadingSlice from './reducers/LoadingSlice/LoadingSlice'
import ModalSlice from './reducers/ModalSlice/ModalSlice'
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
// was <typeof store.getState> but it makes an error with circular references
export type RootState = ReturnType<typeof rootReducer>
//export type AppStore = ReturnType<typeof store>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
//todo need some wrapper for normal ssr state manager work
/*const makeStore = () => store
export const storeWrapper = createWrapper<AppStore>(makeStore)*/
