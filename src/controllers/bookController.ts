import { type NextFunction, type Request, type Response } from 'express'
import BooksServices from '../services/booksService.js'
import { ApiError } from '../utils/ApiError.js'

const getAllBooks = async (_: Request, res: Response): Promise<void> => {
  const books = await BooksServices.getAll()
  res.json(books)
}

const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const book = await BooksServices.getOneById(id)

  if (book === undefined) {
    next(ApiError.notFound('Book not found.'))
    return
  }

  res.json(book)
}

const getBookByISBN = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const ISBN = req.params.ISBN
  const book = await BooksServices.getOneByISBN(ISBN)

  if (book === null) {
    next(ApiError.notFound('Book not found.'))
    return
  }

  if (book instanceof Error) {
    next(ApiError.badRequest('Bad request.', book.message))
    return
  }

  res.json(book)
}

const createNewBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const body = req.body
  const result = await BooksServices.createOne(body)
  result === undefined
    ? next(ApiError.badRequest('Bad request.'))
    : res.status(201).json(result)
}

const createNewCopy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const result = await BooksServices.createOneCopy(id)
  result === undefined
    ? next(ApiError.badRequest('Bad request.'))
    : res.status(201).json(result)
}

const updateBookInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const body = req.body
  const result = await BooksServices.updateOne(id, body)

  if (result === null) {
    next(ApiError.notFound('Book not found.'))
    return
  }

  if (result instanceof Error) {
    next(ApiError.badRequest('Bad request.', result.message))
    return
  }

  res.status(201).json(result)
}

const borrowBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const result = await BooksServices.updateAvailableStatus(id, false)

  if (result === false) {
    next(ApiError.notFound('Book not found or availble to borrow'))
    return
  }

  if (result instanceof Error) {
    next(ApiError.badRequest('Bad request.', result.message))
    return
  }

  res.json(result)
}

const returnBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id
  const result = await BooksServices.updateAvailableStatus(id, true)

  if (result === false) {
    next(ApiError.notFound('Book not found or availble to return'))
    return
  }

  if (result instanceof Error) {
    next(ApiError.badRequest('Bad request.', result.message))
    return
  }

  res.json(result)
}

const deleteBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id = req.params.id

  const result = await BooksServices.deleteOne(id)

  if (result instanceof Error) {
    next(ApiError.badRequest('Bad request.', result.message))
    return
  }

  if (!result) {
    next(ApiError.notFound('Book not found.'))
    return
  }

  res.json({ isDeleted: true })
}

export default {
  getAllBooks,
  getBookById,
  getBookByISBN,
  createNewBook,
  createNewCopy,
  updateBookInfo,
  borrowBookById,
  returnBookById,
  deleteBookById,
}
