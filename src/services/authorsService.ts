import { type Author } from 'types/Author.js'

import { AuthorRepo } from '../models/authorsModel.js'

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
  for (const key of Object.entries(payload)) {
    if (key[1].toString().length === 0) {
      return undefined
    }
  }

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
): Author | undefined | boolean {
  for (const key of Object.entries(payload)) {
    if (key[1].toString().length === 0) {
      return undefined
    }
  }

  const updatedAuthor = authorsRepo.updateOne(authorId, payload)
  return updatedAuthor
}

export default { getAll, getOne, createOne, deleteOne, updateOne }
