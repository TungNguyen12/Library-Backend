export interface Author {
  id: number
  firstName: string
  lastName: string
  books: string[]
}

const authors: Author[] = [
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

export const getAllAuthors = (): Author[] => {
  return authors
}

export const getAuthorById = (authorId: number): Author | undefined => {
  return authors.find((item: Author) => item.id === authorId)
}

export const createNewAuthor = (
  payload: Partial<Author>
): Author | undefined => {
  for (const key of Object.entries(payload)) {
    if (key[1].toString().length === 0) {
      return undefined
    }
  }

  const newId =
    authors.reduce(
      (acc: number, curr: Author) => (acc = Math.max(acc, curr.id)),
      0
    ) + 1
  const newAuthor = { id: newId, ...payload }

  authors.push(newAuthor as Author)
  return newAuthor as Author
}

export const deleteAuthor = (authorId: number): boolean => {
  const findIndex = authors.findIndex(
    (author: Author) => authorId === author.id
  )
  if (findIndex === -1) {
    return false
  }

  authors.splice(findIndex, 1)
  return true
}

export const updateAuthorInfo = (
  authorId: number,
  payload: Partial<Author>
): Author | undefined | boolean => {
  const findIndex = authors.findIndex(
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

  authors[findIndex] = Object.assign(authors[findIndex], payload)
  return authors[findIndex]
}
