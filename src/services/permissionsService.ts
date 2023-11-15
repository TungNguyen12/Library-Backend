import mongoose from 'mongoose'
import PermissionRepo from '../models/permissionsModel.js'
import type { Permission, PermissionUpdate } from '../types/User.js'

async function findAll(): Promise<Permission[]> {
  const permissions = await PermissionRepo.find().exec()
  return permissions as Permission[]
}

async function findOne(
  permissionId: string
): Promise<Permission | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(permissionId)
    const permission = await PermissionRepo.findById(id)

    return permission as Permission | null
  } catch (e) {
    const error = e as Error
    return error
  }
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

async function deletePermission(
  permissionId: string
): Promise<Permission | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(permissionId)
    const result = await PermissionRepo.findByIdAndDelete(id).exec()
    return result as Permission | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function updatePermission(
  permissionId: string,
  payload: PermissionUpdate
): Promise<Permission | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(permissionId)
    const updatedPermission = await PermissionRepo.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      }
    ).exec()

    return updatedPermission as Permission | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  findAll,
  findOne,
  createPermission,
  deletePermission,
  updatePermission,
}
