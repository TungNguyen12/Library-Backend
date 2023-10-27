import { AuthorRepo } from '../models/authorsModel.js'
import { type Author } from '../types/Author.js'

const authorsRepo = new AuthorRepo()

function getAll(): Author[] {
  const authors = authorsRepo.getAll()
  return authors
}

function getOne(authorId: string): Author | undefined {
  const author = authorsRepo.getOne(authorId)
  return author
}

function createOne(payload: Partial<Author>): Author | undefined {
  const newAuthor = authorsRepo.createOne(payload)
  return newAuthor
}

function deleteOne(authorId: string): boolean {
  const result = authorsRepo.deleteOne(authorId)
  return result
}

function updateOne(
  authorId: string,
  payload: Partial<Author>
): Author | boolean {
  const updatedAuthor = authorsRepo.updateOne(authorId, payload)
  return updatedAuthor
}

export default { getAll, getOne, createOne, deleteOne, updateOne }
