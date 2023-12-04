import mongoose, { Types } from 'mongoose'

import {
  BookModel as BooksRepo,
  CopiesBookModel as CopiesBookRepo,
  BorrowedBookModel as BorrowedBookRepo,
} from '../models/bookModel.js'
import {
  type BookCopy,
  type Book,
  type BookFilterSchema,
  type PopulatedBook,
} from '../types/Book.js'
import { type PaginatedData, type AtleastOne } from '../types/AdditionalType.js'

const getAll = async (): Promise<PopulatedBook[]> => {
  const books = await BooksRepo.aggregate([
    {
      $lookup: {
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        pipeline: [
          {
            $addFields: {
              fullName: { $concat: ['$firstName', ' ', '$lastName'] },
            },
          },
          { $project: { fullName: 1 } },
        ],
        as: 'author',
      },
    },
  ])

  return books as PopulatedBook[]
}

const getFilteredBook = async (
  filter: BookFilterSchema
): Promise<PaginatedData<PopulatedBook> | Error> => {
  const searchQuery = filter.search ?? ''

  const sortBy =
    filter.sortBy !== undefined
      ? filter.sortBy === 'id'
        ? '_id'
        : filter.sortBy
      : '_id'

  const sortOrder =
    filter.sortOrder === 'asc' ? 1 : filter.sortOrder === 'desc' ? -1 : 1

  const page =
    filter.page !== undefined
      ? !Number.isNaN(+filter.page)
        ? +filter.page !== 0
          ? +filter.page
          : 1
        : 1
      : 1

  const perPage =
    filter.perPage !== undefined
      ? !Number.isNaN(+filter.perPage)
        ? +filter.perPage !== 0
          ? +filter.perPage
          : 10
        : 10
      : 10

  const limit = perPage
  const skip = perPage * (page - 1)

  const authorFilter = filter.authorName === '' ? null : filter.authorName

  delete filter.perPage
  delete filter.page
  delete filter.search
  delete filter.sortBy
  delete filter.sortOrder
  delete filter.filter
  delete filter.authorName

  const modifiedFilter = {
    ...filter,
    'author.fullName': authorFilter,
  }

  const cleanedFilter = Object.entries(modifiedFilter).reduce(
    (acc, [k, v]) => (v != null ? { ...acc, [k]: v } : acc),
    {}
  )

  try {
    const result = await BooksRepo.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          pipeline: [
            {
              $addFields: {
                fullName: { $concat: ['$firstName', ' ', '$lastName'] },
              },
            },
            { $project: { fullName: 1 } },
          ],
          as: 'author',
        },
      },
      {
        $match: {
          ...cleanedFilter,
          $and: [
            {
              $or: [
                {
                  title: { $regex: `${searchQuery}` },
                },
                {
                  'author.fullName': { $regex: `${searchQuery}` },
                },
              ],
            },
          ],
        },
      },
      {
        $sort: {
          [sortBy]: sortOrder,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          pagination: [{ $count: 'total' }],
        },
      },
    ])

    return {
      data: result[0].data,
      page,
      perPage,
      totalCount:
        result[0].pagination.length > 0 ? result[0].pagination[0].total : 0,
    }
  } catch (e) {
    const err = e as Error
    return err
  }
}

const getOneById = async (bookId: string): Promise<Book | null | Error> => {
  try {
    const id = new Types.ObjectId(bookId)
    const book = await BooksRepo.findById(id)
    return book as Book | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

const getOneByISBN = async (ISBN: string): Promise<Book | null | Error> => {
  try {
    const book = await BooksRepo.findOne({ ISBN })
    return book as Book | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

const getAllCopies = async (): Promise<BookCopy[]> => {
  const books = await CopiesBookRepo.find().exec()
  return books as BookCopy[]
}

const createOne = async (
  payload: AtleastOne<Book, 'ISBN'>
): Promise<Book | undefined> => {
  const newBook = new BooksRepo(payload)
  const result = await newBook.save()
  return result as Book | undefined
}

const createOneCopy = async (bookId: string): Promise<BookCopy | undefined> => {
  const id = new Types.ObjectId(bookId)
  const newCopy = new CopiesBookRepo({ book_id: id, is_Available: true })
  const result = await newCopy.save()
  return result as BookCopy | undefined
}

const updateOne = async (
  bookId: string,
  payload: Partial<Book>
): Promise<Book | null | Error> => {
  try {
    const id = new Types.ObjectId(bookId)
    const filter = { _id: id }
    const updatedBook = await BooksRepo.findByIdAndUpdate(filter, payload, {
      new: true,
    })
    return updatedBook as Book | null
  } catch (e) {
    const err = e as Error
    return err
  }
}

const updateAvailableStatus = async (
  bookId: string,
  newStatus: boolean
): Promise<boolean | BookCopy | Error> => {
  try {
    const copiesBook = await CopiesBookRepo.find({ book_id: bookId })

    if (copiesBook.length === 0) {
      return false
    }

    const availbleCopy = copiesBook.find(
      (book) => book.is_Available === !newStatus
    )

    if (availbleCopy === undefined) {
      return false
    }

    const newCopyStatus = {
      is_Available: newStatus,
    }

    const filter = { _id: availbleCopy._id }

    const updatedStatus = await CopiesBookRepo.findByIdAndUpdate(
      filter,
      newCopyStatus,
      { new: true }
    )

    return updatedStatus !== null ? (updatedStatus as BookCopy) : false
  } catch (e) {
    const err = e as Error
    return err
  }
}

const updateMultiAvailableStatus = async (
  userId: string,
  bookIds: string[],
  newStatus: boolean
): Promise<boolean | Error> => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    for (const bookId of bookIds) {
      const copiesBook = await CopiesBookRepo.find({
        book_id: bookId,
        is_Available: !newStatus,
      })

      if (copiesBook.length === 0) {
        return false
      }

      let selectedCopyId: mongoose.Types.ObjectId

      if (!newStatus) {
        selectedCopyId = copiesBook[0]._id

        const newBorrowBook = new BorrowedBookRepo({
          user_id: userId,
          copy_id: selectedCopyId,
          borrowed_Date: new Date(),
        })

        await newBorrowBook.save()
      } else {
        const availableBooks = await CopiesBookRepo.aggregate([
          {
            $match: {
              book_id: new mongoose.Types.ObjectId(bookId),
              is_Available: false,
            },
          },
          {
            $lookup: {
              from: 'borrowedbooks',
              localField: '_id',
              foreignField: 'copy_id',
              as: 'data',
            },
          },
          {
            $unwind: {
              path: '$data',
              preserveNullAndEmptyArrays: false,
            },
          },
          {
            $match: {
              'data.returned_Date': { $exists: false },
              'data.user_id': new mongoose.Types.ObjectId(userId),
            },
          },
        ]).exec()

        if (availableBooks.length === 0) {
          return false
        }

        await BorrowedBookRepo.findByIdAndUpdate(
          {
            _id: availableBooks[0].data._id,
          },
          {
            returned_Date: new Date(),
          }
        )

        selectedCopyId = availableBooks[0]._id
      }

      await CopiesBookRepo.findByIdAndUpdate(
        { _id: selectedCopyId },
        { is_Available: newStatus }
      ).exec()
    }

    await session.commitTransaction()
    return true
  } catch (e) {
    await session.abortTransaction()
    const err = e as Error
    return err
  }
}

const deleteOne = async (bookId: string): Promise<boolean | Error> => {
  try {
    const id = new Types.ObjectId(bookId)
    const book = await BooksRepo.findById(id)
    const bookCopies = await CopiesBookRepo.find({ book_id: id })

    if (!(bookCopies instanceof Error || bookCopies === null)) {
      bookCopies.forEach(async (book) => {
        await book.deleteOne()
      })
    }

    if (!(book instanceof Error || book === null)) {
      await book.deleteOne()
      return true
    }
    return false
  } catch (e) {
    const err = e as Error
    return err
  }
}

export default {
  getAll,
  getFilteredBook,
  getOneByISBN,
  getOneById,
  getAllCopies,
  createOne,
  createOneCopy,
  updateOne,
  updateAvailableStatus,
  updateMultiAvailableStatus,
  deleteOne,
}
