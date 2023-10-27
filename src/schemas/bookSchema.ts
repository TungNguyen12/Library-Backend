import { z } from 'zod'

const errorMessage = (field: string): object => {
  return { require_error: `${field} is required` }
}

export const bookCreateSchema = z.object({
  body: z
    .object({
      ISBN: z
        .string(errorMessage('ISBN'))
        .min(10)
        .max(13)
        .regex(/?=(?:\D*\d){10}(?:(?:\D*\d){3})?$/, 'Invalid ISBN'),
      title: z.string(errorMessage('Title')).min(2),
      edition: z.string(errorMessage('Edition')).min(2),
      category: z.string(errorMessage('Category')).min(2),
      description: z.string(errorMessage('Description')).min(2),
      publisher: z.string(errorMessage('Publisher')).min(2),
      author: z
        .string()
        .array()
        .nonempty({ message: 'author cannot be empty.' }),
    })
    .strict(),
})

export const bookUpdateSchema = z.object({
  body: z
    .object({
      ISBN: z
        .string()
        .min(10)
        .max(13)
        .regex(/?=(?:\D*\d){10}(?:(?:\D*\d){3})?$/, 'Invalid ISBN')
        .optional(),
      title: z.string().min(1).optional(),
      edition: z.string().min(1).optional(),
      category: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      publisher: z.string().min(1).optional(),
      author: z.string().array().optional(),
    })
    .strict(),
})
