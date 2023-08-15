import { TASK_PRIORITIES, TASK_STATUSES } from '@/constants/tasks.constants'
import { DEFAULT_MINIMUM_CHAR_LENGTH } from '@/constants/validation.constants'
import * as yup from 'yup'

export const createTaskSchema = yup.object({
  title: yup.string().required().min(DEFAULT_MINIMUM_CHAR_LENGTH),
  description: yup
    .string()
    .notRequired()
    .min(DEFAULT_MINIMUM_CHAR_LENGTH)
    .nullable()
    .transform((value) => (!!value ? value : null)),
  status: yup.mixed<TASK_STATUSES>().oneOf(Object.values(TASK_STATUSES)).required(),
  priority: yup.mixed<TASK_PRIORITIES>().oneOf(Object.values(TASK_PRIORITIES)).required(),
  executor_id: yup.number().required(),
})
