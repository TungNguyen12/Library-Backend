import { v4 as uuidv4 } from 'uuid'

import { type Author } from '../types/Author.js'

export class AuthorRepo {
  authors: Author[] = [
    {
      id: uuidv4(),
      firstName: 'Leo',
      lastName: 'Tolstoy',
      books: ['Anna Karenina'],
    },
    {
      id: uuidv4(),
      firstName: 'William',
      lastName: 'Shakespeare',
      books: ['Romeo and Juliet', 'Hamlet'],
    },
    {
      id: uuidv4(),
      firstName: 'Jane',
      lastName: 'Austen',
      books: ['Pride And Prejudice'],
    },
    {
      id: uuidv4(),
      firstName: 'George',
      lastName: 'Orwell',
      books: ['Animal Farm'],
    },
    {
      id: uuidv4(),
      firstName: 'Jules',
      lastName: 'Verne',
      books: ['Journey To The Centre Of The Earth'],
    },
  ]

  getAll(): Author[] {
    return this.authors
  }

  getOne(authorId: string): Author | undefined {
    return this.authors.find((item: Author) => item.id === authorId)
  }

  createOne(payload: Partial<Author>): Author {
    const newAuthor = { id: uuidv4(), ...payload }

    this.authors.push(newAuthor as Author)
    return newAuthor as Author
  }

  deleteOne(authorId: string): boolean {
    const findIndex = this.authors.findIndex(
      (author: Author) => authorId === author.id
    )
    if (findIndex === -1) {
      return false
    }

    this.authors.splice(findIndex, 1)
    return true
  }

  updateOne(authorId: string, payload: Partial<Author>): Author | boolean {
    const findIndex = this.authors.findIndex(
      (author: Author) => authorId === author.id
    )
    if (findIndex === -1) {
      return false
    }

    this.authors[findIndex] = Object.assign(this.authors[findIndex], payload)
    return this.authors[findIndex]
  }
}
