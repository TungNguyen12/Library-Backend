import express from 'express'
import UsersController from '../controllers/usersController.js'
import { validateUser } from '../middlewares/userValidate.js'

const router = express.Router()

router.get('/', UsersController.findAllUsers)
router.get('/:userId', UsersController.findOneUser)

router.post('/', validateUser, UsersController.createNewUser)
router.delete('/:userId', UsersController.deleteUser)
router.put('/:userId', UsersController.updateUser)

export default router
