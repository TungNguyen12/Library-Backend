import type z from 'zod'
import type mongoose from 'mongoose'

import {
  type bookFilterSchema,
  type booksSchema,
} from '../schemas/bookSchema.js'

type BookDTO = z.infer<typeof booksSchema>

export interface BookCopy {
  id: mongoose.Types.ObjectId
  book_id: mongoose.Types.ObjectId
  is_Available: boolean
}

export interface BorrowedBook {
  id: mongoose.Types.ObjectId
  copy_id: mongoose.Types.ObjectId
  user_id: mongoose.Types.ObjectId
  borrowedDate?: Date
  returnedDate?: Date
}

export type BookFilterSchema = z.infer<typeof bookFilterSchema>

export type Book = BookDTO & { id: mongoose.Types.ObjectId }

export type PopulatedBook = Omit<Book, 'author'> & {
  author: Array<{
    id: mongoose.Types.ObjectId
    fullName: string
  }>
}
