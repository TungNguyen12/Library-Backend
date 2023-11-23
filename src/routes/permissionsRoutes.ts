import express from 'express'

import PermissionsController from '../controllers/permissionsController.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import {
  validateCreatePermission,
  validateUpdatePermission,
} from '../middlewares/permissionValidate.js'

const router = express.Router()

router.get('/', checkAuth, PermissionsController.findAllPermissions)
router.get('/:permissionId', checkAuth, PermissionsController.findOnePermission)

router.post(
  '/',
  checkAuth,
  validateCreatePermission,
  PermissionsController.createNewPermission
)
router.delete(
  '/:permissionId',
  checkAuth,
  PermissionsController.deletePermission
)
router.put(
  '/:permissionId',
  checkAuth,
  validateUpdatePermission,
  PermissionsController.updatePermission
)

export default router
