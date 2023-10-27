import { type NextFunction, type Request, type Response } from 'express'
import { type ZodError, z } from 'zod'

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
  const bodySchema = z.object({
    body: authorCreateSchema,
  })

  try {
    bodySchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    const e = error as ZodError
    next(ApiError.badRequest('Bad request.', JSON.parse(e.message)[0].message))
  }
}

export function validateUpdateAuthor(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const bodySchema = z.object({
    body: authorUpdateSchema,
  })

  try {
    bodySchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    const e = error as ZodError
    next(ApiError.badRequest('Bad request.', JSON.parse(e.message)[0].message))
  }
}
