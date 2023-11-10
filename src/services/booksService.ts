import { Types } from 'mongoose'

import {
  BookModel as BooksRepo,
  CopiesBookModel as CopiesBookRepo,
} from '../models/bookModel.js'
import { type BookCopy, type Book } from '../types/Book.js'
import { type AtleastOne } from '../types/AdditionalType.js'

const getAll = async (): Promise<Book[]> => {
  const books = await BooksRepo.find().exec()
  return books as Book[]
}

const getOneById = async (bookId: string): Promise<Book | null | Error> => {
  try {
    const id = new Types.ObjectId(bookId)
    const book = await BooksRepo.findById(id)
    return book as Book | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

const getOneByISBN = async (ISBN: string): Promise<Book | null | Error> => {
  try {
    const book = await BooksRepo.findOne({ ISBN })
    return book as Book | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

const createOne = async (
  payload: AtleastOne<Book, 'ISBN'>
): Promise<Book | undefined> => {
  const newBook = new BooksRepo(payload)
  const result = await newBook.save()
  return result as Book | undefined
}

const createOneCopy = async (bookId: string): Promise<BookCopy | undefined> => {
  const id = new Types.ObjectId(bookId)
  const newCopy = new CopiesBookRepo({ book_id: id, is_Available: true })
  const result = await newCopy.save()
  return result as BookCopy | undefined
}

const updateOne = async (
  bookId: string,
  payload: Partial<Book>
): Promise<Book | null | Error> => {
  try {
    const id = new Types.ObjectId(bookId)
    const filter = { _id: id }
    const updatedBook = await BooksRepo.findByIdAndUpdate(filter, payload, {
      new: true,
    })
    return updatedBook as Book | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

const updateAvailableStatus = async (
  bookId: string,
  newStatus: boolean
): Promise<boolean | BookCopy | Error> => {
  try {
    const copiesBook = await CopiesBookRepo.find({ book_id: bookId })

    if (copiesBook.length === 0) {
      return false
    }

    const availbleCopy = copiesBook.find(
      (book) => book.is_Available === !newStatus
    )

    if (availbleCopy === undefined) {
      return false
    }

    const newCopyStatus = {
      is_Available: newStatus,
    }

    const filter = { _id: availbleCopy._id }

    const updatedStatus = await CopiesBookRepo.findByIdAndUpdate(
      filter,
      newCopyStatus,
      { new: true }
    )

    return updatedStatus !== null ? (updatedStatus as BookCopy) : false
  } catch (e) {
    const err = e as Error
    return err
  }
}

const deleteOne = async (bookId: string): Promise<boolean | Error> => {
  try {
    const id = new Types.ObjectId(bookId)
    const book = await BooksRepo.findById(id)
    if (!(book instanceof Error || book === null)) {
      await book.deleteOne()
      return true
    }
    return false
  } catch (e) {
    const err = e as Error
    return err
  }
}

export default {
  getAll,
  getOneByISBN,
  getOneById,
  createOne,
  createOneCopy,
  updateOne,
  updateAvailableStatus,
  deleteOne,
}
