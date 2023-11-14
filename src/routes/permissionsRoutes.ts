import express from 'express'
import PermissionsController from '../controllers/permissionsController.js'
import {
  validateCreatePermission,
  validateUpdatePermission,
} from '../middlewares/permissionValidate.js'

const router = express.Router()

router.get('/', PermissionsController.findAllPermissions)
router.get('/:permissionId', PermissionsController.findOnePermission)

router.post(
  '/',
  validateCreatePermission,
  PermissionsController.createNewPermission
)
router.delete('/:permissionId', PermissionsController.deletePermission)
router.put(
  '/:permissionId',
  validateUpdatePermission,
  PermissionsController.updatePermission
)

export default router
