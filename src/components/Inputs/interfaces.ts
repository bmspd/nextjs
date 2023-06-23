import { TextFieldProps } from '@mui/material'

export type DefaultTextFieldProps = TextFieldProps & {
  isRequired?: boolean
  alertMessage?: string
}
