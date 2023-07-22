import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '..'
import { endLoading, startLoading } from '../reducers/LoadingSlice/LoadingSlice'
const STATES = {
  PENDING: '/pending',
  FULFILLED: '/fulfilled',
  REJECTCTED: '/rejected',
}
export const loadingMiddleware: Middleware<object, RootState> = (api) => (next) => (action) => {
  const actionType = action?.type
  const { dispatch } = api
  if (actionType?.endsWith(STATES.PENDING)) {
    dispatch(startLoading(actionType.slice(0, -STATES.PENDING.length)))
  } else if (actionType?.endsWith(STATES.FULFILLED)) {
    dispatch(endLoading(actionType.slice(0, -STATES.FULFILLED.length)))
  } else if (actionType?.endsWith(STATES.REJECTCTED)) {
    dispatch(endLoading(actionType.slice(0, -STATES.REJECTCTED.length)))
  }

  return next(action)
}
