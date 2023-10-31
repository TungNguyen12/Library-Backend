import { type NextFunction, type Request, type Response } from 'express'
import { bookCreateSchema, bookUpdateSchema } from '../schemas/bookSchema.js'
import { ApiError } from '../utils/ApiError.js'
import { type ZodError } from 'zod'
import customZodErrorParser from '../utils/customZodErrorParser.js'

export const validateCreateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    bookCreateSchema.parse(req.body)
    next()
  } catch (error) {
    const e = error as ZodError
    const errorMessages = e.flatten()
    next(
      ApiError.badRequest(
        'Bad request.',
        customZodErrorParser(errorMessages.fieldErrors)
      )
    )
  }
}

export const validateUpdateBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    bookUpdateSchema.parse(req.body)
    next()
  } catch (error) {
    const e = error as ZodError
    const errorMessages = e.flatten()
    next(
      ApiError.badRequest(
        'Bad request.',
        customZodErrorParser(errorMessages.fieldErrors)
      )
    )
  }
}
