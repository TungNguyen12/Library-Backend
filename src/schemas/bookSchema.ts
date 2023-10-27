import { z } from 'zod'

const requiredErrorMessage = (field: string): object => {
  return { require_error: `${field} is required` }
}

const emptyErrorMessage = (field: string): string => {
  return `${field} can not be empty`
}

export const booksSchema = z
  .object({
    ISBN: z
      .string(requiredErrorMessage('ISBN'))
      .min(10)
      .max(13)
      .regex(/^(?:\D*\d){10}(?:(?:\D*\d){3})?$/, 'Invalid ISBN'),
    title: z
      .string(requiredErrorMessage('Title'))
      .min(1, emptyErrorMessage('Title')),
    edition: z
      .string(requiredErrorMessage('Edition'))
      .min(1, emptyErrorMessage('Edition')),
    category: z
      .string(requiredErrorMessage('Category'))
      .min(1, emptyErrorMessage('Category')),
    description: z
      .string(requiredErrorMessage('Description'))
      .min(1, emptyErrorMessage('Description')),
    publisher: z
      .string(requiredErrorMessage('Publisher'))
      .min(1, emptyErrorMessage('Publisher')),
    author: z.string().array().nonempty({ message: 'author cannot be empty.' }),
    isAvailable: z.boolean().default(false),
    borrowedDate: z.date().nullable().default(null),
    returnedDate: z.date().nullable().default(null),
  })
  .strict()

export const bookCreateSchema = z.object({
  body: booksSchema.omit({
    isAvailable: true,
    borrowedDate: true,
    returnedDate: true,
  }),
})

export const bookUpdateSchema = z.object({
  body: booksSchema
    .omit({
      isAvailable: true,
      borrowedDate: true,
      returnedDate: true,
    })
    .partial(),
})
