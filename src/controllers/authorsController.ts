import { type NextFunction, type Request, type Response } from 'express'
import { ApiError } from '../utils/ApiError.js'

import AuthorsService from '../services/authorsService.js'

export const getAllAuthorsController = (_: Request, res: Response): void => {
  const authors = AuthorsService.getAll()
  res.json(authors)
}

export const getAuthorByIdController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorId = Number(req.params.authorId)
  const author = AuthorsService.getOne(authorId)

  if (author === undefined) {
    next(ApiError.notFound('Author not found.'))
    return
  }

  res.json(author)
}

export const createNewAuthorController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const body = req.body
  const result = AuthorsService.createOne(body)

  if (result === undefined) {
    next(ApiError.methodNotAllowed('Invalid input.'))
    return
  }

  res.status(201).json(result)
}

export const deleteAuthorController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorId = Number(req.params.authorId)

  if (!AuthorsService.deleteOne(authorId)) {
    next(ApiError.notFound('Author not found.'))
    return
  }

  res.json({ isDeleted: true })
}

export const updateAuthorInfoController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorId = Number(req.params.authorId)
  const body = req.body
  const result = AuthorsService.updateOne(authorId, body)

  if (result === false) {
    next(ApiError.notFound('Author not found.'))
    return
  } else if (result === undefined) {
    next(ApiError.methodNotAllowed('Invalid input.'))
    return
  }

  res.json(result)
}
