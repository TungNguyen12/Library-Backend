import { CrudStatsRepo } from '../models/crudStatsModel.js'
import type { CrudStats, CrudType } from '../types/CrudStats.js'

const crudStatsRepo = new CrudStatsRepo()

function getAll(): CrudStats {
  const stats = crudStatsRepo.getAll()
  return stats
}

function getOne(type: keyof CrudStats): CrudStats | undefined {
  const stats = crudStatsRepo.getOne(type)
  return stats
}

function increment(type: CrudType, isSuccess: boolean): CrudStats {
  return crudStatsRepo.increment(type, isSuccess)
}

export default { getAll, increment, getOne }
