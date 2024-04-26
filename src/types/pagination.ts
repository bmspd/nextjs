import { ServerMetaData } from './server'

export type DataWithPagination<T> = { data: T[]; meta: ServerMetaData }

export type PaginationParams = {
  page: number | string
  per_page: number | string
}
