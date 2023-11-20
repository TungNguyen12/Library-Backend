import RoleRepo from '../models/rolesModel.js'
import type { Role, RoleWithPermissions } from '../types/User.js'

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
  roleId: string
): Promise<RoleWithPermissions | null> {
  const role = await RoleRepo.findOne({ _id: roleId }).populate('permissions')
  return role as RoleWithPermissions | null
}

async function createRole(newRole: Role): Promise<Role | Error | null> {
  try {
    const isAvailable = await RoleRepo.exists({ title: newRole.title })
    if (isAvailable === null) {
      const role = await RoleRepo.create(newRole)
      return role as Role
    }
    return null
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  findAll,
  findByTitle,
  findById,
  findByIdWithPermissions,
  createRole,
}
