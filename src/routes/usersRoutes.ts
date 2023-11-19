import express from 'express'

import authController from '../controllers/authsController.js'
import UsersController from '../controllers/usersController.js'
import {
  validateCreateUser,
  validateUpdateUser,
} from '../middlewares/userValidate.js'
import { checkAuth } from '../middlewares/checkAuth.js'

const router = express.Router()

router.get('/', UsersController.findAllUsers)
router.post('/signup', validateCreateUser, authController.signup)
router.post('/signin', authController.signin)
// router.post('/addrole', UsersController.addRoleToUserController)
router.get('/:userId', UsersController.findOneUser)

router.post('/', validateCreateUser, UsersController.createNewUser)
router.delete('/:userId', UsersController.deleteUser)
router.put(
  '/:userId',
  checkAuth,
  validateUpdateUser,
  UsersController.updateUser
)

export default router
