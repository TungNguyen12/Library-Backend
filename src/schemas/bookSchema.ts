import { type RefinementCtx, z, ZodIssueCode } from 'zod'

export const booksSchema = z
  .object({
    ISBN: z.string().superRefine((val: string, ctx: RefinementCtx) => {
      let sum: number
      let weight: number
      let digit: number
      let check: number | 'X'
      let i: number
      let result = true

      val = val.replace(/[^0-9X]/gi, '')

      if (val.length !== 10 && val.length !== 13) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          params: {
            customMessage:
              'Invalid ISBN code, ISBN code must only include 10 or 13 number character',
          },
          fatal: true,
        })

        return z.NEVER
      }

      check = -1

      switch (val.length) {
        case 13: {
          sum = 0
          for (i = 0; i < 12; i++) {
            digit = parseInt(val[i])
            if (i % 2 === 1) {
              sum += 3 * digit
            } else {
              sum += digit
            }
            check = (10 - (sum % 10)) % 10
          }
          result = check === parseInt(val[val.length - 1])
          break
        }
        case 10: {
          weight = 10
          sum = 0
          for (i = 0; i < 9; i++) {
            digit = parseInt(val[i])
            sum += weight * digit
            weight--
          }
          check = (11 - (sum % 11)) % 11
          if (check === 10) {
            check = 'X'
          }
          const last =
            val[val.length - 1].toUpperCase() === 'X'
              ? 'X'
              : parseInt(val[val.length - 1])
          result = check === last
          break
        }
        default: {
          break
        }
      }
      if (!result) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          params: {
            customMessage: 'Invalid ISBN',
          },
          fatal: true,
        })
        return z.NEVER
      }
    }),
    title: z.string().min(1),
    edition: z.string().min(1),
    category: z.string().min(1),
    description: z.string().min(1),
    publisher: z.string().min(1),
    author: z.array(z.string().min(1)).min(1).default([]),
  })
  .strict()

export const bookFilterSchema = booksSchema
  .merge(
    z.object({
      page: z.string().optional(),
      perPage: z.string().optional(),
      search: z.string().optional(),
      sortBy: z
        .enum(['id', 'title', 'edition', 'category', 'publisher'])
        .optional(),
      sortOrder: z.enum(['asc', 'desc']).optional(),
    })
  )
  .omit({
    title: true,
    description: true,
  })
  .partial()
  .strict()

export const bookCreateSchema = booksSchema

export const bookUpdateSchema = booksSchema.partial()
