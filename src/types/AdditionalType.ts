export type AtleastOne<T, K extends keyof T> = Partial<T> & Pick<T, K>
export type convertedPaginationDataType = {
  perPage: number
  page: number
  totalPageCount: number
  totalCount: number
  data: any[]
}
