import express from 'express'

const router = express.Router()

// Get all Book
router.get('/')

// Get Book with given ISBN
router.get('/:ISBN')

// Create new Book (require admin auth)
router.post('/')

// Delete Book with given ISBN (require admin auth)
router.delete('/:ISBN')

// Update Book with given ISBN (require admin auth)
router.put('/:ISBN')

// borrow Book with given ISBN (require user/admin auth)
router.post('/borrow/:ISBN')

// return Book with given ISBN (require user/admin auth)
router.post('/return/:ISBN')

export default router
