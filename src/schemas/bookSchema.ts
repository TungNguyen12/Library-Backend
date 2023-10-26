import { z } from 'zod'

export const bookCreateSchema = z.object({
  body: z
    .object({
      ISBN: z.number(),
      title: z.string().min(2),
      edition: z.string().min(2),
      category: z.string().min(2),
      description: z.string().min(2),
      publisher: z.string().min(2),
      author: z
        .string()
        .array()
        .nonempty({ message: 'author cannot be empty. ' }),
    })
    .strict(),
})

export const bookUpdateSchema = z.object({
  body: z
    .object({
      ISBN: z.number().optional(),
      title: z.string().min(1).optional(),
      edition: z.string().min(1).optional(),
      category: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      publisher: z.string().min(1).optional(),
      author: z.string().array().optional(),
    })
    .strict(),
})
