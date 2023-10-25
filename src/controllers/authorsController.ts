import { type NextFunction, type Request, type Response } from 'express'

import { ApiError } from '../utils/ApiError.js'
import AuthorsService from '../services/authorsService.js'

function getAllAuthors(_: Request, res: Response): void {
  const authors = AuthorsService.getAll()
  res.json(authors)
}

function getAuthorById(req: Request, res: Response, next: NextFunction): void {
  const authorId = req.params.authorId
  const author = AuthorsService.getOne(authorId)

  if (author === undefined) {
    next(ApiError.notFound('Author not found.'))
    return
  }

  res.json(author)
}

function createNewAuthor(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const body = req.body
  const result = AuthorsService.createOne(body)

  res.status(201).json(result)
}

function deleteAuthor(req: Request, res: Response, next: NextFunction): void {
  const authorId = req.params.authorId

  if (!AuthorsService.deleteOne(authorId)) {
    next(ApiError.notFound('Author not found.'))
    return
  }

  res.json({ isDeleted: true })
}

function updateAuthorInfo(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authorId = req.params.authorId
  const body = req.body
  const result = AuthorsService.updateOne(authorId, body)

  if (result === false) {
    next(ApiError.notFound('Author not found.'))
    return
  }

  res.json(result)
}

export default {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  deleteAuthor,
  updateAuthorInfo,
}
