import express from 'express'

import AuthorsController from '../controllers/authorsController.js'

const router = express.Router()

router.get('/', AuthorsController.getAllAuthors)
router.post('/', AuthorsController.createNewAuthor)
router.get('/:authorId', AuthorsController.getAuthorById)
router.delete('/:authorId', AuthorsController.deleteAuthor)
router.put('/:authorId', AuthorsController.updateAuthorInfo)

export default router
