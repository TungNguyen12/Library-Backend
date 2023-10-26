import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/ApiError.js'
import { userCreateSchema, userUpdateSchema } from '../schemas/usersSchema.js'

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
    if (typeof error === 'string') {
      next(ApiError.badRequest(error))
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
    if (typeof error === 'string') {
      next(ApiError.badRequest(error))
    }
    next(ApiError.internal('Something wrong happened'))
  }
}
