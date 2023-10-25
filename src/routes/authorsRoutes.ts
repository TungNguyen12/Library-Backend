import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express'

import AuthorsController from '../controllers/authorsController.js'
import {
  validateCreateAuthor,
  validateUpdateAuthor,
} from '../middlewares/authorValidate.js'

const router = express.Router()

router.get('/', AuthorsController.getAllAuthors)
router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    validateCreateAuthor(req, res, next)
  },
  AuthorsController.createNewAuthor
)
router.get('/:authorId', AuthorsController.getAuthorById)
router.delete('/:authorId', AuthorsController.deleteAuthor)
router.put(
  '/:authorId',
  (req: Request, res: Response, next: NextFunction) => {
    validateUpdateAuthor(req, res, next)
  },
  AuthorsController.updateAuthorInfo
)

export default router
