/*eslint-disable @typescript-eslint/no-explicit-any*/
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit'

// not sure if it is correct...
// this decorator is made to send serverError to rejected state of asyncThunk
export function tryCatch<T = void, R = any>(
  fn: AsyncThunkPayloadCreator<Promise<R>, T, any>
): AsyncThunkPayloadCreator<R, T, any> {
  return async function (...args) {
    try {
      return await fn(...args)
    } catch (error: any) {
      const action = args[1]
      const { rejectWithValue } = action
      if (!error?.response) {
        return rejectWithValue({ data: { errors: { 'server-error': 'Something went wrong' } } })
      }
      const { data, status, statusText } = error.response
      return rejectWithValue({ data, status, statusText })
    }
  }
}
