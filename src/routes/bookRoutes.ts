import express from 'express'

import BookController from '../controllers/bookController.js'
import {
  validateCreateBook,
  validateDuplication,
  validateUpdateBook,
} from '../middlewares/bookValidate.js'
const router = express.Router()

// Get all Book
router.get('/', BookController.getAllBooks)

// Get all book copies
router.get('/copy', BookController.getAllBookCopies)

// Get Book with given id
router.get('/:id', BookController.getBookById)

// Get Book with given ISBN
router.get('/ISBN/:ISBN', BookController.getBookByISBN)

// Create new Book (require admin auth)
router.post(
  '/',
  validateCreateBook,
  validateDuplication,
  BookController.createNewBook
)

// Create new Book copy with given id
router.post('/copy/:id', BookController.createNewCopy)

// Delete Book with given id (require admin auth)
router.delete('/:id', BookController.deleteBookById)

// Update Book with given id (require admin auth)
router.put('/:id', validateUpdateBook, BookController.updateBookInfo)

// borrow Book with given id (require user/admin auth)
router.post('/borrow/:id', BookController.borrowBookById)

// return Book with given id(require user/admin auth)
router.post('/return/:id', BookController.returnBookById)

export default router
