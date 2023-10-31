import { type NextFunction, type Request, type Response } from 'express'
import { bookCreateSchema, bookUpdateSchema } from '../schemas/bookSchema.js'
import validatorTryCatch from '../utils/validatorTryCatch.js'

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  validatorTryCatch(req.body, bookCreateSchema, next)
}

export const validateUpdateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  validatorTryCatch(req.body, bookUpdateSchema, next)
}
