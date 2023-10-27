import express from 'express'

import BookController from '../controllers/bookController.js'
import {
  validateCreateBook,
  validateUpdateBook,
} from '../middlewares/bookValidate.js'
const router = express.Router()

// Get all Book
router.get('/', BookController.getAllBooks)

// Get Book with given ISBN
router.get('/:ISBN', BookController.getBookByISBN)

// Create new Book (require admin auth)
router.post('/', validateCreateBook, BookController.createNewBook)

// Delete Book with given ISBN (require admin auth)
router.delete('/:ISBN', BookController.deleteBookByISBN)

// Update Book with given ISBN (require admin auth)
router.put('/:ISBN', validateUpdateBook, BookController.updateBookInfo)

// borrow Book with given ISBN (require user/admin auth)
router.post('/borrow/:ISBN', BookController.borrowBookByISBN)

// return Book with given ISBN (require user/admin auth)
router.post('/return/:ISBN', BookController.returnBookByISBN)

export default router
