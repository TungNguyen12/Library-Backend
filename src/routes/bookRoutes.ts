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

// Get all Book
router.get('/', validateFilteringQuery, BookController.getBooks)

// Get all book copies
router.get('/copy', BookController.getAllBookCopies)

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
