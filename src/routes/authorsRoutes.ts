import express from 'express'

import AuthorsController from '../controllers/authorsController.js'
import {
  validateCreateAuthor,
  validateUpdateAuthor,
} from '../middlewares/authorValidate.js'

const router = express.Router()

router.get('/', AuthorsController.getAllAuthors)
router.post('/', validateCreateAuthor, AuthorsController.createNewAuthor)
router.get('/:authorId', AuthorsController.getAuthorById)
router.delete('/:authorId', AuthorsController.deleteAuthor)
router.put(
  '/:authorId',
  validateUpdateAuthor,
  AuthorsController.updateAuthorInfo
)

export default router
