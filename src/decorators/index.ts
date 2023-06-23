/*eslint-disable @typescript-eslint/no-explicit-any*/
import { AsyncThunkPayloadCreator } from '@reduxjs/toolkit'

// not sure if it is correct...
// this decorator is made to send serverError to rejected state of asyncThunk
export function tryCatch(
  fn: AsyncThunkPayloadCreator<any, any, any>
): AsyncThunkPayloadCreator<any, any, any> {
  return async function (...args) {
    try {
      return await fn(...args)
    } catch (error: any) {
      const action = args[1]
      const { rejectWithValue } = action
      const { data, status, statusText } = error.response
      return rejectWithValue({ data, status, statusText })
    }
  }
}
