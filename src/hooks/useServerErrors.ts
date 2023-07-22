/*eslint-disable @typescript-eslint/no-explicit-any*/
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ServerErrorResponse } from '../types/serverError'

export function useServerErrors<TFieldValues extends FieldValues>(
  setError: UseFormSetError<TFieldValues>
) {
  const setServerErrors = (error: any) => {
    const payload = error as ServerErrorResponse<TFieldValues>
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
