import * as yup from 'yup'
import {
  DEFAULT_MAXIMUM_CHAR_LENGTH,
  DEFAULT_MINIMUM_CHAR_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from '../constants/validation.constants'

export const signUpSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(MINIMUM_PASSWORD_LENGTH).max(DEFAULT_MAXIMUM_CHAR_LENGTH),
  username: yup
    .string()
    .notRequired()
    .min(DEFAULT_MINIMUM_CHAR_LENGTH)
    .max(DEFAULT_MAXIMUM_CHAR_LENGTH)
    .nullable()
    .transform((value) => (!!value ? value : null)),
  first_name: yup
    .string()
    .notRequired()
    .min(DEFAULT_MINIMUM_CHAR_LENGTH)
    .max(DEFAULT_MAXIMUM_CHAR_LENGTH)
    .nullable()
    .transform((value) => (!!value ? value : null)),
  second_name: yup
    .string()
    .notRequired()
    .min(DEFAULT_MINIMUM_CHAR_LENGTH)
    .max(DEFAULT_MAXIMUM_CHAR_LENGTH)
    .nullable()
    .transform((value) => (!!value ? value : null)),
})
