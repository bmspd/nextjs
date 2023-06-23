/*eslint-disable @typescript-eslint/no-explicit-any*/
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OptionsWithExtraProps, SnackbarKey, SnackbarMessage, VariantType } from 'notistack'

export type Notification = {
  // я дурак, который не знает тайпскрипт
  options: OptionsWithExtraProps<VariantType> | any
  message?: SnackbarMessage
  key: SnackbarKey
  dismissed?: boolean
}

type InitialNotificationsState = {
  notifications: Notification[]
}
const initialState: InitialNotificationsState = {
  notifications: [],
}

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    enqueueSnackbar: (state, action) => {
      const notification = action.payload
      const key = notification.options && notification.options.key
      state.notifications = [...state.notifications, { ...notification, key }]
    },
    closeSnackbar: (state, action: PayloadAction<SnackbarKey | undefined>) => {
      const dismissAll = !action.payload
      console.log(dismissAll)
      state.notifications = [
        ...state.notifications.map((notification) =>
          dismissAll || notification.key === action.payload
            ? {
                ...notification,
                dismissed: true,
              }
            : { ...notification }
        ),
      ]
    },
    removeSnackbar: (state, action) => {
      const key = action.payload
      state.notifications = [...state.notifications.filter((el) => el.key !== key)]
    },
  },
})

export const { enqueueSnackbar, removeSnackbar, closeSnackbar } = NotificationsSlice.actions
export default NotificationsSlice.reducer
