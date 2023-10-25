import { type Request, type Response } from 'express'

import {
  createNewAuthor,
  getAllAuthors,
  getAuthorById,
} from './../models/authorsModel.js'

export const getAllAuthorsController = (_: Request, res: Response): void => {
  const authors = getAllAuthors()
  res.json(authors)
}

export const getAuthorByIdController = (req: Request, res: Response): void => {
  const authorId = Number(req.params.authorId)
  const author = getAuthorById(authorId)
  if (author === undefined) {
    res.status(404).json({ error: 'Author not found' })
  }
  res.json(author)
}

export const createNewAuthorController = (
  req: Request,
  res: Response
): void => {
  const body = req.body
  const result = createNewAuthor(body)
  if (result === undefined) {
    res.status(405).json({ error: 'Invalid input' })
  }
  res.json(result)
}
