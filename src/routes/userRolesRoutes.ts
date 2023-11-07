import express from 'express'
import UserRolesController from '../controllers/userRolesController.js'

const router = express.Router()

router.get('/', UserRolesController.findAllUserRoles)

router.post('/', UserRolesController.createNewUserRole)

export default router
