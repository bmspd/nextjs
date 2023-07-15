import * as yup from 'yup'

export const logInSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
})
