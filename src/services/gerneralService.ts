import { type Model } from 'mongoose'

const filter = async (
  filter: Record<string, any>,
  repo: Model<any>
): Promise<Record<string, any> | null | Error> => {
  const Repo = repo
  // const searchQuery = filter.search ?? ''
  // const sortBy = filter.sortBy ?? '_id'
  // const sortOrder = filter.sortOrder === 'asc' ? 1 : -1
  const limit =
    'limit' in filter ? (!Number.isNaN(+filter.limit) ? +filter.limit : 10) : 10
  const offset =
    'offset' in filter
      ? !Number.isNaN(+filter.offset)
        ? +filter.offset
        : 0
      : 0
  const limitOffset = {
    limit,
    skip: offset,
  }
  delete filter.limit
  delete filter.offset
  delete filter.search
  delete filter.sortBy
  delete filter.sortOrder
  try {
    console.log(filter)
    const result = await Repo.find(filter, limitOffset)
    return result as Record<string, any> | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

export default {
  filter,
}
