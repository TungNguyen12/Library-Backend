import PermissionRepo from '../models/permissionsModel.js'
import type { Permission } from '../types/User.js'

async function findAll(): Promise<Permission[]> {
  const permissions = await PermissionRepo.find().exec()
  return permissions as Permission[]
}

async function createPermission(
  newPermission: Permission
): Promise<Permission | null | Error> {
  try {
    const isAvailable = await PermissionRepo.exists({
      action: newPermission.action,
    })
    if (isAvailable === null) {
      const permission = await PermissionRepo.create(newPermission)
      return permission as Permission
    }
    return null
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  findAll,
  createPermission,
}
