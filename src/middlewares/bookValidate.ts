import { type NextFunction, type Request, type Response } from 'express'
import { bookCreateSchema, bookUpdateSchema } from 'schemas/bookSchema'
import { ApiError } from 'utils/ApiError'

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    bookCreateSchema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    next(ApiError.badRequest('Bad request.'))
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
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    next(ApiError.badRequest('Bad request.'))
  }
}
