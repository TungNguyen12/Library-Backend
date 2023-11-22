import mongoose, { type Types } from 'mongoose'

import RoleRepo from '../models/rolesModel.js'
import type { Role, RoleDTO, RoleWithPermissions } from '../types/User.js'
import { ApiError } from '../utils/ApiError.js'

async function findAll(): Promise<Role[]> {
  const roles = await RoleRepo.find().exec()
  return roles as Role[]
}

// findByTitle
async function findByTitle(title: string): Promise<Role | null> {
  const role = await RoleRepo.findOne({ title })
  return role as Role | null
}

async function findById(roleId: string): Promise<Role | null> {
  const role = await RoleRepo.findOne({ _id: roleId })
  return role as Role | null
}

async function findByIdWithPermissions(
  roleId: string | Types.ObjectId
): Promise<RoleWithPermissions | null> {
  const id =
    typeof roleId === 'string' ? new mongoose.Types.ObjectId(roleId) : roleId
  const role = await RoleRepo.findOne({ _id: id }).populate('permissions')
  return role as RoleWithPermissions | null
}

async function createRole(newRole: RoleDTO): Promise<Role | ApiError> {
  const isAvailable = await RoleRepo.exists({ title: newRole.title })
  if (isAvailable !== null) {
    return ApiError.conflict('Role already exists')
  }

  try {
    const role = await RoleRepo.create(newRole)
    return role as Role
  } catch (error) {
    const e = error as Error
    return ApiError.internal(e.message)
  }
}

async function addPermission(
  roleId: Types.ObjectId,
  permissionId: Types.ObjectId
): Promise<Role | ApiError> {
  const role = await RoleRepo.findOne({ _id: roleId })
  if (role === null) {
    return ApiError.notFound('Role not found')
  }
  try {
    role.permissions.push(permissionId)
    await role.save()
    return role as Role
  } catch (error) {
    const e = error as Error
    return ApiError.internal(e.message)
  }
}

export default {
  findAll,
  findByTitle,
  findById,
  findByIdWithPermissions,
  createRole,
  addPermission,
}
