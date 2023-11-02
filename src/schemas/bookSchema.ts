import { type RefinementCtx, z, ZodIssueCode } from 'zod'
import CustomErrorMap from '../utils/customZodError.js'

export const booksSchema = z
  .object({
    ISBN: z
      .string(CustomErrorMap)
      .min(10)
      .max(13)
      .superRefine((val: string, ctx: RefinementCtx) => {
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
          })
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
            weight = 0
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
            result = check === val[val.length - 1].toUpperCase()
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
          })
        }
      }),
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
