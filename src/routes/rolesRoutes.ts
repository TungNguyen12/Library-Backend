import express from 'express'
import RolesController from '../controllers/rolesController.js'
import { validateCreateRole } from '../middlewares/roleValidate.js'

const router = express.Router()

router.get('/', RolesController.findAllRoles)

router.post('/', validateCreateRole, RolesController.createNewRole)

export default router
