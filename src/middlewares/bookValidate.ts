import { type NextFunction, type Request, type Response } from 'express'
import { bookCreateSchema, bookUpdateSchema } from '../schemas/bookSchema.js'
import { ApiError } from '../utils/ApiError.js'
import { type ZodError } from 'zod'

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
    const e = error as ZodError
    const errorMessages: string[] = []
    JSON.parse(e.message).forEach((element: any) => {
      errorMessages.push(element.message)
    })

    next(ApiError.badRequest('Bad request.', errorMessages.join(' ')))
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
    const e = error as ZodError
    const errorMessages: string[] = []
    JSON.parse(e.message).forEach((element: any) => {
      errorMessages.push(element.message)
    })

    next(ApiError.badRequest('Bad request.', errorMessages.join(' ')))
  }
}
