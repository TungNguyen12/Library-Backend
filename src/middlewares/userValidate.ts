/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const userSchema = z.object({
  body: z.object({
    id: z.number({
      required_error: 'Id required',
    }),
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
    role: z.string({
      required_error: 'Role is required',
    }),
  }),
})

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await userSchema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
