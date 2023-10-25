import express from 'express'

import {
  getAllAuthorsController,
  getAuthorByIdController,
} from '../controllers/authorsController.js'

const router = express.Router()

router.get('/', getAllAuthorsController)
router.get('/:authorId', getAuthorByIdController)

export default router
