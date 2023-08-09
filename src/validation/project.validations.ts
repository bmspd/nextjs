import * as yup from 'yup'

export const createProjectSchema = yup.object({
  name: yup.string().required(),
})
