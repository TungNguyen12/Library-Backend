import { type NextFunction, type Request, type Response } from 'express'
import { bookCreateSchema, bookUpdateSchema } from '../schemas/bookSchema.js'
import { ApiError } from '../utils/ApiError.js'
import { ZodError } from 'zod'

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    bookCreateSchema.parse({
      body: req.body,
    })
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      next(ApiError.badRequest('Bad Request', error.errors))
    }
    next(ApiError.internal('Something wrong happened'))
  }
}

export const validateUpdateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    bookUpdateSchema.parse({
      body: req.body,
    })
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      next(ApiError.badRequest('Bad Request', error.errors))
    }
    next(ApiError.internal('Something wrong happened'))
  }
}
