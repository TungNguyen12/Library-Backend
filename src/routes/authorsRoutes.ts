import express from 'express'

import {
  createNewAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
} from '../controllers/authorsController.js'

const router = express.Router()

router.get('/', getAllAuthorsController)
router.post('/', createNewAuthorController)
router.get('/:authorId', getAuthorByIdController)

export default router
