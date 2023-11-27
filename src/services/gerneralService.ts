import { type Model } from 'mongoose'

const filter = async (
  searchField: string, // This field will be used for search
  filter: Record<string, any>,
  repo: Model<any>
): Promise<Record<string, any> | Error> => {
  const Repo = repo
  const searchQuery = filter.search ?? ''
  const sortBy = filter.sortBy ?? '_id'
  const sortOrder =
    filter.sortOrder === 'asc' ? 1 : filter.sortOrder === 'desc' ? -1 : 1
  const limit =
    'limit' in filter ? (!Number.isNaN(+filter.limit) ? +filter.limit : 10) : 10
  const offset =
    'offset' in filter
      ? !Number.isNaN(+filter.offset)
        ? +filter.offset
        : 0
      : 0
  delete filter.limit
  delete filter.offset
  delete filter.search
  delete filter.sortBy
  delete filter.sortOrder

  filter = {
    ...filter,
    [searchField]: { $regex: `${searchQuery}` },
  }

  try {
    const result = await Repo.find(filter)
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .skip(offset)
    return result as Record<string, any>
  } catch (e) {
    const err = e as Error
    return err
  }
}

export default {
  filter,
}
