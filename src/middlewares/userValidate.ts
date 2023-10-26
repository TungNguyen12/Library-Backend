import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { userCreateSchema, userUpdateSchema } from '../schemas/usersSchema.js'
import { ApiError } from '../utils/ApiError.js'

export async function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await userCreateSchema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      next(ApiError.badRequest('Bad Request', error.errors))
    }
    next(ApiError.internal('Something wrong happened'))
  }
}

export async function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await userUpdateSchema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      next(ApiError.badRequest('Bad Request', error.errors))
    }
    next(ApiError.internal('Something wrong happened'))
  }
}
