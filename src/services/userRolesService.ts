import mongoose from 'mongoose'

import UserRoleRepo from '../models/userRolesModel.js'
import type { UserRole } from '../types/User.js'

async function addRoleToUser(
  userId: mongoose.Types.ObjectId,
  role: string
): Promise<UserRole | Error | null> {
  const roleId = new mongoose.Types.ObjectId(role)
  try {
    const newUserRole = await UserRoleRepo.create({
      user: userId,
      role: roleId,
    })
    return newUserRole as UserRole
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  addRoleToUser,
}
