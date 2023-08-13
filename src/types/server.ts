export interface ServerPagintion {
  page: number
  per_page: number
  total: number
  last_page: number
}

export interface ServerMetaData {
  pagination: ServerPagintion
}
