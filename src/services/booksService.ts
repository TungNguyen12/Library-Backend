import { BookRepo } from '../models/bookModel.js'
import { type Book } from '../types/Book.js'

const booksRepo = new BookRepo()

const getAll = (): Book[] => {
  const books = booksRepo.getAll()
  return books
}

const getOne = (ISBN: string): Book | undefined => {
  const book = booksRepo.getOne(ISBN)
  return book
}

const createOne = (payload: Partial<Book>): boolean | Book => {
  const result = booksRepo.createOne(payload)
  return result
}

const updateOne = (ISBN: string, payload: Partial<Book>): boolean | Book => {
  const result = booksRepo.updateOne(ISBN, payload)
  return result
}

const updateAvailableStatus = (
  ISBN: string,
  newStatus: boolean
): boolean | Book => {
  const result = booksRepo.updateAvailableStatus(ISBN, newStatus)
  return result
}

const deleteOne = (ISBN: string): boolean => {
  const result = booksRepo.deleteOne(ISBN)
  return result
}

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  updateAvailableStatus,
  deleteOne,
}
