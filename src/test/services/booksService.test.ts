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
  convertedCategoryData,
  convertedPopulatedBookData,
} from '../mockData/booksData.js'

import AuthorsRepo from '../../models/authorsModel.js'

import { authorsData } from '../mockData/authorsData.js'

import booksService from '../../services/booksService.js'
import { type BookFilterSchema, type PopulatedBook } from '../../types/Book.js'
import { type PaginatedData } from '../../types/AdditionalType.js'
import gerneralService from '../../services/gerneralService.js'
import CategoryRepo from '../../models/categoriesModel.js'
import mongoose from 'mongoose'

describe('Book service', () => {
  let mongoHelper: MongoHelper

  beforeAll(async () => {
    mongoHelper = await connect()
  })

  beforeEach(async () => {
    await AuthorsRepo.create(authorsData[0])
    await BookModelRepo.create(convertedBookData[0])
    await CopiesBookRepo.create(BookCopiesData)
    await BorrowedBookRepo.create(BorrowedBookData)
    await CategoryRepo.create(convertedCategoryData[0])
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

  describe('filtering books', () => {
    describe('filtering with full query', () => {
      it('should return a book', async () => {
        const query: BookFilterSchema = {
          page: '1',
          perPage: '1',
          search: '69',
          categoryName: 'Historical',
          publisher: 'something',
          sortBy: 'id',
          sortOrder: 'desc',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>
        expect(result.data).toHaveLength(1)
      })
      it('should return a book', async () => {
        const query = {
          page: '1',
          perPage: '1',
          search: '69',
          category: new mongoose.Types.ObjectId('656ea26860a0da45f1752145'),
          publisher: 'something',
          sortBy: 'id',
          sortOrder: 'desc',
        }
        const result = (await gerneralService.filter(
          ['title'],
          query,
          BookModelRepo
        )) as Record<string, any>
        expect(result.data).toHaveLength(1)
      })
      it('should return an empty array', async () => {
        const query: BookFilterSchema = {
          page: '1',
          perPage: '1',
          search: '69',
          categoryName: 'something1',
          publisher: 'something',
          sortBy: 'id',
          sortOrder: 'desc',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>
        expect(result.data).toHaveLength(0)
      })
    })
    describe('filering with partial query', () => {
      it('should return a book', async () => {
        const query: BookFilterSchema = {
          perPage: '1',
          search: '69',
          categoryName: 'Historical',
          publisher: 'something',
          sortOrder: 'desc',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>
        expect(result.data).toHaveLength(1)
      })
      it('should return an empty array', async () => {
        const query: BookFilterSchema = {
          perPage: '1',
          search: '69',
          categoryName: 'something1',
          publisher: 'something',
          sortBy: 'id',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>
        expect(result.data).toHaveLength(0)
      })
    })
    describe('filter with more data', () => {
      it('should return a book', async () => {
        await booksService.createOne(convertedBookData[1])
        const query: BookFilterSchema = {
          perPage: '1',
          search: '69',
          categoryName: 'Historical',
          publisher: 'something',
          sortOrder: 'desc',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>
        expect(result.data).toHaveLength(1)
      })
      it('should return both book', async () => {
        await booksService.createOne(convertedBookData[1])
        const query: BookFilterSchema = {
          perPage: '2',
          search: 'something',
          categoryName: 'Historical',
          publisher: 'something',
          sortOrder: 'desc',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>

        const expectedResult = [
          convertedPopulatedBookData[1],
          convertedPopulatedBookData[0],
        ]
        expect(JSON.stringify(result.data)).toEqual(
          JSON.stringify(expectedResult)
        )
      })
      it('should return an empty array', async () => {
        await booksService.createOne(convertedBookData[1])
        const query: BookFilterSchema = {
          perPage: '1',
          search: '69',
          categoryName: 'something1',
          publisher: 'something',
          sortBy: 'id',
        }
        const result = (await booksService.getFilteredBook(
          query
        )) as PaginatedData<PopulatedBook>
        expect(result.data).toHaveLength(0)
      })
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
