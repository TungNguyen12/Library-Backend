import { type Author } from 'types/Author.js'

import { AuthorRepo } from '../models/authorsModel.js'

const authorsRepo = new AuthorRepo()

function getAll(): Author[] {
  const authors = authorsRepo.getAll()
  return authors
}

function getOne(authorId: number): Author | undefined {
  const author = authorsRepo.getOne(authorId)
  return author
}

function createOne(payload: Partial<Author>): Author | undefined {
  const newAuthor = authorsRepo.createOne(payload)
  return newAuthor
}

function deleteOne(authorId: number): boolean {
  const result = authorsRepo.deleteOne(authorId)
  return result
}

function updateOne(
  authorId: number,
  payload: Partial<Author>
): Author | undefined | boolean {
  const updatedAuthor = authorsRepo.updateOne(authorId, payload)
  return updatedAuthor
}

export default { getAll, getOne, createOne, deleteOne, updateOne }
