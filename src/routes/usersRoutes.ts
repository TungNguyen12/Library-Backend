import express from 'express'

import UsersController from '../controllers/usersController.js'
import {
  validateCreateUser,
  validateUpdateUser,
} from '../middlewares/userValidate.js'

const router = express.Router()

router.get('/', UsersController.findAllUsers)
router.post('/addrole', UsersController.addRoleToUserController)
router.get('/:userId', UsersController.findOneUser)

router.post('/', validateCreateUser, UsersController.createNewUser)
router.delete('/:userId', UsersController.deleteUser)
router.put('/:userId', validateUpdateUser, UsersController.updateUser)

export default router
