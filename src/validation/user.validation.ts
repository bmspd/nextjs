import * as yup from 'yup'

export const inviteUserToProjectSchema = yup.object({
  email: yup.string().required(),
})
