import { z } from 'zod'

export const authorCreateSchema = z
  .object({
    firstName: z
      .string({
        required_error: 'First name is required.',
      })
      .min(1, 'First name cannot be empty.'),
    lastName: z
      .string({
        required_error: 'Last name is required.',
      })
      .min(1, 'Last name cannot be empty.'),
    books: z
      .string({
        required_error: 'Book array is required.',
      })
      .array()
      .nonempty({ message: 'Book array cannot be empty.' }),
  })
  .strict()

export const authorUpdateSchema = z
  .object({
    firstName: z.string().min(1, 'First name cannot be empty.').optional(),
    lastName: z.string().min(1, 'Last name cannot be empty.').optional(),
    books: z
      .string()
      .array()
      .nonempty({ message: 'Book array cannot be empty.' })
      .optional(),
  })
  .strict()
