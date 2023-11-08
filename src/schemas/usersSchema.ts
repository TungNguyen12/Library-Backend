import { z } from 'zod'

export const userSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .min(1, 'First name cannot be empty.'),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .min(1, 'Last name cannot be empty.'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .min(1, 'Email cannot be empty.')
      .email('Not a valid email'),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .min(1, 'Address cannot be empty.'),
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .min(1, 'Phone number cannot be empty.'),
    roles: z
      .string({
        required_error: 'Role ID is required',
      })
      .array()
      .min(1, 'Role ID cannot be empty.'),
  })
  .strict()

export const userCreateSchema = z.object({
  body: userSchema,
})

export const userUpdateSchema = z.object({
  body: userSchema.partial(),
})
