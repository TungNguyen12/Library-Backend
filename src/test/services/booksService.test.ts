import connect, { type MongoHelper } from '../db-helper.js'
import {
  BookModel as BookModelRepo,
  BorrowedBookModel as BorrowedBookRepo,
  CopiesBookModel as CopiesBookRepo,
} from '../../models/bookModel.js'
import {
  BookCopiesData,
  BorrowedBookData,
  booksData,
  convertedBookData,
} from '../mockData/booksData.js'
import booksService from '../../services/booksService.js'

describe('Book service', () => {
  let mongoHelper: MongoHelper

  beforeAll(async () => {
    mongoHelper = await connect()
  })

  beforeEach(async () => {
    await BookModelRepo.create(convertedBookData[0])
    await CopiesBookRepo.create(BookCopiesData)
    await BorrowedBookRepo.create(BorrowedBookData)
  })

  afterEach(async () => {
    await mongoHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongoHelper.closeDatabase()
  })

  describe('get all books', () => {
    it('Should return all books', async () => {
      const result = await booksService.getAll()
      expect(result).toHaveLength(1)
    })
  })

  describe('get a book with id', () => {
    it('Should return one book', async () => {
      const bookId = String(booksData[0].id)
      const result = await booksService.getOneById(bookId)
      expect(result).toHaveProperty('_id', booksData[0].id)
    })

    it('Should return null if not found', async () => {
      const bookId = String(booksData[1].id)
      const result = await booksService.getOneById(bookId)
      expect(result).toBeNull()
    })
  })

  describe('get all copies', () => {
    it('Should return all books', async () => {
      const result = await booksService.getAllCopies()
      expect(result).toHaveLength(2)
    })
  })

  describe('create a book', () => {
    it('Should return a book', async () => {
      const result = await booksService.createOne(convertedBookData[1])
      expect(result).toMatchObject(convertedBookData[1])
    })
  })

  describe('create a copy', () => {
    it('Should return a copy', async () => {
      const bookId = String(booksData[0].id)
      const result = await booksService.createOneCopy(bookId)
      expect(result).toHaveProperty('book_id', booksData[0].id)
    })
  })

  describe('update book copy status', () => {
    it('Should return true', async () => {
      const bookIds = [String(booksData[0].id)]
      const userId = '655d1091fba90fb470aa806f'
      const result = await booksService.updateMultiAvailableStatus(
        userId,
        bookIds,
        false
      )
      expect(result).toBe(true)
    })

    it('Should return false', async () => {
      const bookIds = [String(booksData[1].id)]
      const userId = '655d1091fba90fb470aa806f'
      const result = await booksService.updateMultiAvailableStatus(
        userId,
        bookIds,
        false
      )
      expect(result).toBe(false)
    })
  })

  describe('delete a book with id', () => {
    it('Should return true', async () => {
      const bookId = String(booksData[0].id)
      const result = await booksService.deleteOne(bookId)
      expect(result).toBe(true)
    })
    it('Should return false', async () => {
      const bookId = String(booksData[1].id)
      const result = await booksService.deleteOne(bookId)
      expect(result).toBe(false)
    })
  })
})
