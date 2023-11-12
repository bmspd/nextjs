import { PROJECT_PATTERN_COLORS, PROJECT_PATTERN_TYPES } from '@/http/services/ProjectsService'
import * as yup from 'yup'

export const createProjectSchema = yup.object({
  name: yup.string().required(),
  pattern_type: yup
    .mixed<PROJECT_PATTERN_TYPES>()
    .oneOf(Object.values(PROJECT_PATTERN_TYPES))
    .nullable(),
  pattern_color: yup
    .mixed<PROJECT_PATTERN_COLORS>()
    .oneOf(Object.values(PROJECT_PATTERN_COLORS))
    .nullable(),
})
