import type { CrudStats } from '../types/CrudStats.js'

export class CrudStatsRepo {
  private readonly stats: CrudStats = {
    create: { total: 0, successful: 0 },
    read: { total: 0, successful: 0 },
    update: { total: 0, successful: 0 },
    delete: { total: 0, successful: 0 },
  }

  getAll(): CrudStats {
    return JSON.parse(JSON.stringify(this.stats))
  }

  getOne(type: keyof CrudStats): CrudStats {
    return JSON.parse(JSON.stringify(this.stats[type]))
  }

  increment(type: keyof CrudStats, isSuccess: boolean): CrudStats {
    this.stats[type].total += 1
    if (isSuccess) {
      this.stats[type].successful += 1
    }

    return JSON.parse(JSON.stringify(this.stats))
  }
}
