import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/ApiError.js'

import { z } from 'zod'

const userSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
  }),
})

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await userSchema.parseAsync({
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
