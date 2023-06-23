import { RootState } from '../../index'

export const selectNotifications = (state: RootState) => state.notifications.notifications
