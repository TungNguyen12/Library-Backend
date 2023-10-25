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
