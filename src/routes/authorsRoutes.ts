import express from 'express'

import {
  createNewAuthorController,
  deleteAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
} from '../controllers/authorsController.js'

const router = express.Router()

router.get('/', getAllAuthorsController)
router.post('/', createNewAuthorController)
router.get('/:authorId', getAuthorByIdController)
router.delete('/:authorId', deleteAuthorController)

export default router
