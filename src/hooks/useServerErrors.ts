/*eslint-disable @typescript-eslint/no-explicit-any*/
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { PayloadAction } from '@reduxjs/toolkit'
import { ServerErrorResponse } from '../types/serverError'
import { endsWith } from 'lodash'

export function useServerErrors<TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>
) {
  const setServerErrors = (action: PayloadAction<any>) => {
    console.log(action)
    if (!endsWith(action.type, 'rejected')) return action
    const payload = action.payload as ServerErrorResponse<TFieldValues>
    const errors = payload.data.errors
    Object.entries(errors).forEach((entries) => {
      const [key, value] = entries as [Path<TFieldValues>, string | string[]]
      let message = ''
      if (Array.isArray(value)) message = value.join('. ')
      else message = value
      if (key === 'server-error') setError('root.serverError', { message })
      else setError(key, { message })
    })
  }
  return setServerErrors
}
