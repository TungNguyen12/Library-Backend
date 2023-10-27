import { type NextFunction, type Request, type Response } from 'express'
import BooksServices from '../services/booksService.js'
import { ApiError } from '../utils/ApiError.js'

const getAllBooks = (_: Request, res: Response): void => {
  const books = BooksServices.getAll()
  res.json(books)
}

const getBookByISBN = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ISBN = req.params.ISBN
  const book = BooksServices.getOne(ISBN)

  if (book === undefined) {
    next(ApiError.notFound('Book not found.'))
    return
  }

  res.json(book)
}

const createNewBook = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body = req.body
  const result = BooksServices.createOne(body)

  res.status(201).json(result)
}

const updateBookInfo = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ISBN = req.params.ISBN
  const body = req.body
  const result = BooksServices.updateOne(ISBN, body)

  if (!result) {
    next(ApiError.notFound('Book not found'))
    return
  }

  res.json(result)
}

const borrowBookByISBN = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ISBN = req.params.ISBN
  const result = BooksServices.updateAvailableStatus(ISBN, false)

  if (!result) {
    next(ApiError.notFound('Book not found or availble to borrow'))
    return
  }

  res.json(result)
}

const returnBookByISBN = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ISBN = req.params.ISBN
  const result = BooksServices.updateAvailableStatus(ISBN, true)

  if (!result) {
    next(ApiError.notFound('Book not found or availble to borrow'))
    return
  }

  res.json(result)
}

const deleteBookByISBN = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ISBN = req.params.ISBN

  if (!BooksServices.deleteOne(ISBN)) {
    next(ApiError.notFound('Book not found'))
    return
  }

  res.json({ success: true })
}

export default {
  getAllBooks,
  getBookByISBN,
  createNewBook,
  updateBookInfo,
  borrowBookByISBN,
  returnBookByISBN,
  deleteBookByISBN,
}
