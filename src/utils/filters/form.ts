import { isArray } from 'lodash'

export const formFiltersToServer = <T extends Record<string, unknown[] | string | number>>(
  filters: T
) => {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (isArray(value)) {
      if (value?.length) acc[key as keyof T] = JSON.stringify(value)
    } else {
      acc[key as keyof T] = `${value}`
    }
    return acc
  }, {} as { [Prop in keyof T]: string })
}
