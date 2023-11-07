import UserRolesRepo from '../models/userRolesModel.js'
import type { UserRole } from '../types/User.js'

async function findAll(): Promise<UserRole[]> {
  const userRoles = await UserRolesRepo.find().exec()
  return userRoles as UserRole[]
}

async function createUserRole(
  newUserRole: UserRole
): Promise<UserRole | Error | null> {
  try {
    const isAvailable = await UserRolesRepo.exists({ title: newUserRole.title })
    if (isAvailable === null) {
      const newRole = await UserRolesRepo.create(newUserRole)
      return newRole as UserRole
    }
    return null
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  findAll,
  createUserRole,
}
