import { z } from 'zod'

export const authorCreateSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      books: z
        .string()
        .array()
        .nonempty({ message: 'Book array cannot be empty.' }),
    })
    .strict(),
})

export const authorUpdateSchema = z.object({
  body: z
    .object({
      firstName: z.string().min(1).optional(),
      lastName: z.string().min(1).optional(),
      books: z.string().array().optional(),
    })
    .strict(),
})
