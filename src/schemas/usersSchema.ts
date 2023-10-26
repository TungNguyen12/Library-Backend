import { z } from 'zod'

export const userSchema = z.object({
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
})

export const userCreateSchema = z.object({
  body: userSchema,
})

export const userUpdateSchema = z.object({
  body: userSchema.partial(),
})
