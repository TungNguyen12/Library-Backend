import { type Author } from 'types/Author.js'

export class AuthorRepo {
  authors: Author[] = [
    { id: 1, firstName: 'Leo', lastName: 'Tolstoy', books: ['Anna Karenina'] },
    {
      id: 2,
      firstName: 'William',
      lastName: 'Shakespeare',
      books: ['Romeo and Juliet', 'Hamlet'],
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Austen',
      books: ['Pride And Prejudice'],
    },
    {
      id: 4,
      firstName: 'George',
      lastName: 'Orwell',
      books: ['Animal Farm'],
    },
    {
      id: 5,
      firstName: 'Jules',
      lastName: 'Verne',
      books: ['Journey To The Centre Of The Earth'],
    },
  ]

  getAll(): Author[] {
    return this.authors
  }

  getOne(authorId: number): Author | undefined {
    return this.authors.find((item: Author) => item.id === authorId)
  }

  createOne(payload: Partial<Author>): Author | undefined {
    for (const key of Object.entries(payload)) {
      if (key[1].toString().length === 0) {
        return undefined
      }
    }

    const newId =
      this.authors.reduce(
        (acc: number, curr: Author) => (acc = Math.max(acc, curr.id)),
        0
      ) + 1
    const newAuthor = { id: newId, ...payload }

    this.authors.push(newAuthor as Author)
    return newAuthor as Author
  }

  deleteOne(authorId: number): boolean {
    const findIndex = this.authors.findIndex(
      (author: Author) => authorId === author.id
    )
    if (findIndex === -1) {
      return false
    }

    this.authors.splice(findIndex, 1)
    return true
  }

  updateOne(
    authorId: number,
    payload: Partial<Author>
  ): Author | undefined | boolean {
    const findIndex = this.authors.findIndex(
      (author: Author) => authorId === author.id
    )
    if (findIndex === -1) {
      return false
    }

    for (const key of Object.entries(payload)) {
      if (key[1].toString().length === 0) {
        return undefined
      }
    }

    this.authors[findIndex] = Object.assign(this.authors[findIndex], payload)
    return this.authors[findIndex]
  }
}
