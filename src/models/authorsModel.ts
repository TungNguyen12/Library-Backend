import { v4 as uuidv4 } from 'uuid'

import { type Author } from '../types/Author.js'

export class AuthorRepo {
  authors: Author[] = [
    {
      id: 'ed20b7b5-89c4-4be2-b282-e65118b158f1',
      firstName: 'Leo',
      lastName: 'Tolstoy',
      books: ['Anna Karenina'],
    },
    {
      id: '76b63dc5-b6d8-431e-8ceb-05f29bca5548',
      firstName: 'William',
      lastName: 'Shakespeare',
      books: ['Romeo and Juliet', 'Hamlet'],
    },
    {
      id: '57449635-33b5-4ef0-b879-2b0883ac4cbc',
      firstName: 'Jane',
      lastName: 'Austen',
      books: ['Pride And Prejudice'],
    },
    {
      id: 'd7ac7679-c4f0-4c23-9f93-86fe84be948a',
      firstName: 'George',
      lastName: 'Orwell',
      books: ['Animal Farm'],
    },
    {
      id: '14cec075-6c3d-4930-ad9e-f0c1ebace929',
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
