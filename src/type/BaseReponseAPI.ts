export interface BaseReponseAPI<T> {
  status: number
  message: string
  data: T
  meta: Meta
}

export interface Meta {
  total: number
  page: number
  limit: number
  totalPages: number
}
