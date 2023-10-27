import { type NextFunction, type Request, type Response } from 'express'

import CrudStatsService from '../services/crudstatsService.js'
import { type CrudType } from '../types/CrudStats.js'
import { ApiError } from '../utils/ApiError.js'

function getAllCrudStats(_: Request, res: Response): void {
  const stats = CrudStatsService.getAll()
  res.json(stats)
}

function getOneCrudStats(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const crudType: CrudType = req.params.crudType as CrudType
  const allowedCrudTypes: CrudType[] = ['create', 'read', 'update', 'delete']

  if (!allowedCrudTypes.includes(crudType)) {
    next(
      ApiError.badRequest(
        `Only 'create', 'read', 'update', 'delete' are allowed`
      )
    )
    return
  }

  const stats = CrudStatsService.getOne(crudType)
  res.json({ [crudType]: stats })
}

export default {
  getAllCrudStats,
  getOneCrudStats,
}
