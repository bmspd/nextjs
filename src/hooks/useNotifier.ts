import { SnackbarKey, useSnackbar } from 'notistack'
import { useEffect } from 'react'
import { removeSnackbar } from '../store/reducers/NotificationsSlice/NotificationsSlice'
import { selectNotifications } from '../store/reducers/NotificationsSlice/selectors'
import { useTypedDispatch, useTypedSelector } from './typedStoreHooks'

let displayed: SnackbarKey[] = []

const useNotifier = () => {
  const dispatch = useTypedDispatch()
  const notifications = useTypedSelector(selectNotifications)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed, id]
  }
  const removeDisplayed = (id: SnackbarKey) => {
    displayed = [...displayed.filter((el) => id !== el)]
  }
  useEffect(() => {
    notifications.forEach(({ key, message, options, dismissed = false }) => {
      if (dismissed) {
        closeSnackbar(key)
        return
      }
      if (displayed.includes(key)) return
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) options.onClose(event, reason, myKey)
        },
        onExited: (event, myKey) => {
          dispatch(removeSnackbar(myKey))
          removeDisplayed(myKey)
        },
      })
      storeDisplayed(key)
    })
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])
}

export default useNotifier
