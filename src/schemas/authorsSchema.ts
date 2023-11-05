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
      .array(z.string().min(1, 'Book title cannot be empty.'))
      .min(1, { message: 'Book array cannot be empty.' })
      .default([]),
  })
  .strict()

export const authorUpdateSchema = z
  .object({
    firstName: z.string().min(1, 'First name cannot be empty.').optional(),
    lastName: z.string().min(1, 'Last name cannot be empty.').optional(),
    books: z
      .string()
      .min(1, 'Book title cannot be empty.')
      .array()
      .nonempty({ message: 'Book array cannot be empty.' })
      .optional(),
  })
  .strict()
