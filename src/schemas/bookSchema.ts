import { z } from 'zod'
import CustomErrorMap from '../utils/customZodError.js'

export const booksSchema = z
  .object({
    ISBN: z
      .string(CustomErrorMap)
      .min(10)
      .max(13)
      .regex(/^(?:\D*\d){10}(?:(?:\D*\d){3})?$/, 'Invalid ISBN'),
    title: z.string(CustomErrorMap).min(1),
    edition: z.string(CustomErrorMap).min(1),
    category: z.string(CustomErrorMap).min(1),
    description: z.string(CustomErrorMap).min(1),
    publisher: z.string(CustomErrorMap).min(1),
    author: z.string(CustomErrorMap).array().nonempty(),
    isAvailable: z.boolean().default(false),
    borrowedDate: z.date().nullable().default(null),
    returnedDate: z.date().nullable().default(null),
  })
  .strict()

export const bookCreateSchema = booksSchema.omit({
  isAvailable: true,
  borrowedDate: true,
  returnedDate: true,
})

export const bookUpdateSchema = booksSchema
  .omit({
    isAvailable: true,
    borrowedDate: true,
    returnedDate: true,
  })
  .partial()
