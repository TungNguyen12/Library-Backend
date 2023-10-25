import { type Request, type Response } from 'express'

import { getAllAuthors, getAuthorById } from './../models/authorsModel.js'

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
