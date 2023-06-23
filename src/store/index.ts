import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import AuthSlice from './reducers/AuthSlice/AuthSlice'
import NotificationsSlice from './reducers/NotificationsSlice/NotificationsSlice'

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notifications: NotificationsSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
//export type AppStore = ReturnType<typeof store>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>
//todo need some wrapper for normal ssr state manager work
/*const makeStore = () => store
export const storeWrapper = createWrapper<AppStore>(makeStore)*/
