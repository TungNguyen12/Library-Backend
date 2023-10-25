import express from 'express'

import {
  createNewAuthorController,
  deleteAuthorController,
  getAllAuthorsController,
  getAuthorByIdController,
  updateAuthorInfoController,
} from '../controllers/authorsController.js'

const router = express.Router()

router.get('/', getAllAuthorsController)
router.post('/', createNewAuthorController)
router.get('/:authorId', getAuthorByIdController)
router.delete('/:authorId', deleteAuthorController)
router.put('/:authorId', updateAuthorInfoController)

export default router
