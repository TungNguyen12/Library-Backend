import { type NextFunction, type Request, type Response } from 'express'

import {
  authorCreateSchema,
  authorUpdateSchema,
} from '../schemas/authorsSchema.js'
import { ApiError } from '../utils/ApiError.js'

export function validateCreateAuthor(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    authorCreateSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    next(ApiError.badRequest('Bad request.'))
  }
}

export function validateUpdateAuthor(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    authorUpdateSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    next(ApiError.badRequest('Bad request.'))
  }
}
