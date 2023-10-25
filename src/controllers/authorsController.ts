import { type Request, type Response } from 'express'

import {
  createNewAuthor,
  deleteAuthor,
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
  } else {
    res.json(author)
  }
}

export const createNewAuthorController = (
  req: Request,
  res: Response
): void => {
  const body = req.body
  const result = createNewAuthor(body)
  if (result === undefined) {
    res.status(405).json({ error: 'Invalid input' })
  } else {
    res.json(result)
  }
}

export const deleteAuthorController = (req: Request, res: Response): void => {
  const authorId = Number(req.params.authorId)
  if (!deleteAuthor(authorId)) {
    res.status(404).json({ error: 'Author not found' })
  } else {
    res.json({ isDeleted: true })
  }
}
