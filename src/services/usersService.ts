import mongoose from 'mongoose'

import { type UserUpdate, type User } from '../types/User.js'
import UserRepo from '../models/userModel.js'

async function findAll(): Promise<User[]> {
  const users = await UserRepo.find().exec()
  return users as User[]
}

async function findOne(userId: string): Promise<User | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const user = await UserRepo.findById(id)

    return user as User | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function createUser(newUser: User): Promise<User | Error | null> {
  try {
    const isAvailable = await UserRepo.exists({ email: newUser.email })
    if (isAvailable === null) {
      const user = await UserRepo.create(newUser)
      return user as User
    }
    return null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function deleteUser(userId: string): Promise<User | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const result = await UserRepo.findByIdAndDelete(id).exec()
    return result as User | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function updateUser(
  userId: string,
  payload: UserUpdate
): Promise<User | Error | null> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const updatedUser = await UserRepo.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    }).exec()

    return updatedUser as User | null
  } catch (e) {
    const error = e as Error
    return error
  }
}

export default {
  findOne,
  findAll,
  createUser,
  deleteUser,
  updateUser,
}
