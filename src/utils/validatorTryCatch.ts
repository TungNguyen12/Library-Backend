import { type NextFunction } from 'express'
import { type ZodError, type ZodTypeAny } from 'zod'
import customZodErrorParser from './customZodErrorParser.js'
import { ApiError } from './ApiError.js'

const validatorTryCatch = (
  data: Record<string, any>,
  schema: ZodTypeAny,
  next: NextFunction
): void => {
  try {
    schema.parse(data)
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

export default validatorTryCatch
