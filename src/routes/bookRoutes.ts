import express from 'express'

import BookController from '../controllers/bookController.js'
import {
  validateCreateBook,
  validateDuplication,
  validateFilteringQuery,
  validateUpdateBook,
} from '../middlewares/bookValidate.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import { checkPermission } from '../middlewares/checkPermission.js'
const router = express.Router()

/**
 * @swagger
 * /api/v1/books:
 *  get:
 *    summery: Return all books or books with filtering and pagination
 *    parameters:
 *      - in: query
 *        name: filter
 *        schema:
 *          type: interger
 *        description: Choose between 1 and 0 to indicate wherether the data is filtered or not (default is 0)
 *      - in: query
 *        name: page
 *        schema:
 *          type: interger
 *        description: Choose page number
 *      - in: query
 *        name: perPage
 *        schema:
 *          type: interger
 *        description: Number of data entries per page
 *      - in: query
 *        name: search
 *        schema:
 *          type: string
 *        description: Search string
 *      - in: query
 *        name: sortBy
 *        schema:
 *          type: string
 *        description: Choose which field the data is sorted by allows id, title, edition, category, publisher
 *      - in: query
 *        name: sortOrder
 *        schema:
 *          type: string
 *        description: Choose sort order ('asc' or 'desc')
 *      - in: query
 *        name: authorName
 *        schema:
 *          type: string
 *        description: Filter result by author fullname
 *      - in: query
 *        name: categoryName
 *        schema:
 *          type: string
 *        description: Filter result by category name
 *      - in: query
 *        name: edition
 *        schema:
 *          type: string
 *        description: Filter result by edition
 *      - in: query
 *        name: publisher
 *        schema:
 *          type: string
 *        description: Filter result by publisher
 */
router.get('/', validateFilteringQuery, BookController.getBooks)

// Get all book copies
router.get('/copy', BookController.getAllBookCopies)

// Get user borrow history
router.get('/history', checkAuth, BookController.getUserBorrowHistory)

// Get Book with given id
router.get('/:id', BookController.getBookById)

// Get Book with given ISBN
router.get('/ISBN/:ISBN', BookController.getBookByISBN)

// Create new Book (require admin auth)
router.post(
  '/',
  checkAuth,
  checkPermission('BOOKS_CREATE'),
  validateCreateBook,
  validateDuplication,
  BookController.createNewBook
)

// Create new Book copy with given id
router.post(
  '/copy/:id',
  checkAuth,
  checkPermission('BOOKS_CREATE'),
  BookController.createNewCopy
)

// Delete Book with given id (require admin auth)
router.delete(
  '/:id',
  checkAuth,
  checkPermission('BOOKS_DELETE'),
  BookController.deleteBookById
)

// Update Book with given id (require admin auth)
router.put('/:id', validateUpdateBook, BookController.updateBookInfo)

// borrow Book with given array of book_id (require user/admin auth)
router.post(
  '/borrow',
  checkAuth,
  checkPermission('BORROW_UPDATE'),
  BookController.borrowBookById
)

// return Book with given array of book_id(require user/admin auth)
router.post(
  '/return',
  checkAuth,
  checkPermission('BORROW_UPDATE'),
  BookController.returnBookById
)

export default router
