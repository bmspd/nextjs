import { HttpStatusCode } from 'axios'
import { Path } from 'react-hook-form'

export type ServerErrorsObject<TFieldValues> = Record<Path<TFieldValues>, string | string[]>

export type ServerErrorResponse<TFieldValues> = {
  data: {
    errors: ServerErrorsObject<TFieldValues>
  }
  status: HttpStatusCode
  statusText: string
}
