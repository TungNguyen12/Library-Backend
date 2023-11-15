import mongoose from 'mongoose'
import type { ObjectId } from 'mongoose'

import UserRoleRepo from '../models/userRolesModel.js'
import type { UserRole } from '../types/User.js'

async function addRoleToUser(
  newUserRole: UserRole
): Promise<UserRole | Error | null> {
  try {
    const userRole = await UserRoleRepo.create(newUserRole)
    return userRole as UserRole | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function findAllUserRole(): Promise<UserRole[]> {
  const users = await UserRoleRepo.find()
    .populate('user')
    .populate('role')
    .exec()
  return users as UserRole[]
}

async function findByUserId(userId: string): Promise<UserRole | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const userRole = await UserRoleRepo.findOne({ user: id })
      .populate('user')
      .populate('role')
      .exec()
    return userRole as UserRole | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function deleteUserRole(
  userId: string
): Promise<UserRole | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const userRoleUpdate = await UserRoleRepo.findOneAndDelete({
      user: id,
    }).exec()
    return userRoleUpdate as UserRole | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function updateUserRole(
  userId: string,
  payload: { role: ObjectId }
): Promise<UserRole | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const userRoleUpdate = await UserRoleRepo.findOneAndUpdate(
      { user: id },
      payload,
      {
        new: true,
      }
    )
      .populate('user')
      .populate('role')
      .exec()
    return userRoleUpdate as UserRole | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  addRoleToUser,
  findAllUserRole,
  findByUserId,
  updateUserRole,
  deleteUserRole,
}
