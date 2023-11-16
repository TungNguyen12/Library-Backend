import RoleRepo from '../models/rolesModel.js'
import type { Role } from '../types/User.js'

async function findAll(): Promise<Role[]> {
  const roles = await RoleRepo.find().exec()
  return roles as Role[]
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
  createRole,
}