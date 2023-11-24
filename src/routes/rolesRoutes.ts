import express from 'express'

import RolesController from '../controllers/rolesController.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import { checkPermission } from '../middlewares/checkPermission.js'
import { validateCreateRole } from '../middlewares/roleValidate.js'

const router = express.Router()

router.get(
  '/',
  checkAuth,
  checkPermission('ROLES_READ'),
  RolesController.findAllRoles
)

router.post(
  '/',
  checkAuth,
  checkPermission('ROLES_CREATE'),
  validateCreateRole,
  RolesController.createNewRole
)

router.post(
  '/:roleId/addPermission',
  checkAuth,
  checkPermission('ROLES_UPDATE'),
  RolesController.addPermission
)

export default router
