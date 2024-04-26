import { isArray } from 'lodash'

export const parseFilters = <T extends Record<string, unknown>>(
  searchParams: Record<string, string | undefined>,
  filters: Record<string, (value: string | undefined) => T[keyof T]>
) => {
  const res = Object.entries(filters).reduce((acc, [field, fn]) => {
    Object.defineProperty(acc, field, {
      value: fn(searchParams[field]),
      enumerable: true,
      configurable: true,
    })
    return acc
  }, {} as T)
  return res
}

const array = (value: string | undefined) => {
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    if (!isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

const string = (value: string | undefined) => {
  if (!value) return ''
  return value
}
const number = (defaultValue: number) => (value: string | undefined) => {
  if (isFinite(Number(value))) return Number(value)
  else return defaultValue
}

export const parseFn = {
  array,
  string,
  number,
}
