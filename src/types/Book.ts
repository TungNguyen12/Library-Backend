import type z from 'zod'
import type mongoose from 'mongoose'

import { type booksSchema } from '../schemas/bookSchema.js'

type BookDTO = z.infer<typeof booksSchema>

export interface BookCopy {
  id: mongoose.Types.ObjectId
  book_id: mongoose.Types.ObjectId
  is_Available: boolean
}

export type Book = BookDTO & { id: mongoose.Types.ObjectId }
