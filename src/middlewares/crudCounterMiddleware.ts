import { type NextFunction, type Request, type Response } from 'express'

import crudstatsService from '../services/crudstatsService.js'
import { httpMethodToCrudOperation } from '../utils/crudMapping.js'

export const crudCounterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const originalSend = res.send

  res.send = function (data?: any): Response {
    const isSuccess = res.statusCode >= 200 && res.statusCode < 300
    const crudOperation = httpMethodToCrudOperation(req.method)
    if (crudOperation !== null) {
      crudstatsService.increment(crudOperation, isSuccess)
    }
    return originalSend.call(this, data)
  }

  next()
}
