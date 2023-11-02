import { type Book } from '../types/Book.js'

export class BookRepo {
  books: Book[] = [
    {
      ISBN: '1501167715',
      title: 'something',
      edition: '1',
      category: 'something',
      description: 'something',
      publisher: 'something',
      author: ['someone'],
      isAvailable: true,
      borrowedDate: null,
      returnedDate: null,
    },
    {
      ISBN: '1501167716',
      title: 'something420',
      edition: '1.2',
      category: 'something',
      description: 'something',
      publisher: 'something',
      author: ['someone'],
      isAvailable: true,
      borrowedDate: null,
      returnedDate: null,
    },
    {
      ISBN: '1501167717',
      title: 'something69',
      edition: '1.3',
      category: 'something',
      description: 'something',
      publisher: 'something',
      author: ['someone'],
      isAvailable: true,
      borrowedDate: null,
      returnedDate: null,
    },
  ]

  getAll(): Book[] {
    return this.books
  }

  getOne(ISBN: string): Book | undefined {
    return this.books.find((book: Book) => book.ISBN === ISBN)
  }

  createOne(payload: Partial<Book>): boolean | Book {
    const findISBNIndex = this.books.findIndex(
      (book: Book) => book.ISBN === payload.ISBN
    )

    if (findISBNIndex !== -1) {
      return false
    }

    const newBook = {
      ...payload,
      isAvailable: true,
      borrrowedDate: null,
      returnedDate: null,
    }

    this.books.push(newBook as Book)
    return newBook as Book
  }

  updateOne(ISBN: string, payload: Partial<Book>): boolean | Book {
    const findISBNIndex = this.books.findIndex(
      (book: Book) =>
        book.ISBN.replace(/[^0-9X]/gi, '') === ISBN.replace(/[^0-9X]/gi, '')
    )

    if (findISBNIndex === -1) {
      return false
    }

    this.books[findISBNIndex] = Object.assign(
      this.books[findISBNIndex],
      payload
    )
    return this.books[findISBNIndex]
  }

  updateAvailableStatus(ISBN: string, newStatus: boolean): boolean | Book {
    const findISBNIndex = this.books.findIndex(
      (book: Book) => book.ISBN === ISBN && book.isAvailable !== newStatus
    )

    if (findISBNIndex === -1) {
      return false
    }

    this.books[findISBNIndex].isAvailable = newStatus
    if (newStatus) {
      this.books[findISBNIndex].returnedDate = new Date()
      this.books[findISBNIndex].borrowedDate = null
    } else {
      this.books[findISBNIndex].returnedDate = null
      this.books[findISBNIndex].borrowedDate = new Date()
    }
    return this.books[findISBNIndex]
  }

  deleteOne(ISBN: string): boolean {
    const findISBNIndex = this.books.findIndex(
      (book: Book) => book.ISBN === ISBN
    )

    if (findISBNIndex === -1) {
      return false
    }

    this.books.splice(findISBNIndex, 1)
    return true
  }
}
