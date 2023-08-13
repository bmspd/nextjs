export const createQueryParams = (params: Record<string, string>): string => {
  return `?${new URLSearchParams(params)}`
}
