import { type UserUpdate, type User } from '../types/User.js'
import UserRepo from '../models/userModel.js'

async function findAll(): Promise<User[]> {
  const users = await UserRepo.find().exec()

  return users as User[]
}

async function findOne(userId: string): Promise<User | undefined> {
  const user = await UserRepo.findOne({ _id: userId }).exec()

  return user as User
}

async function createOne(newUser: User): Promise<User | Error | undefined> {
  try {
    const isAvailable = await UserRepo.exists({ email: newUser.email }).exec()

    if (isAvailable === null) {
      const user = await UserRepo.create(newUser)
      return user as User
    }
    return undefined
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function deleteUser(userId: string): boolean {
  const result = await UserRepo.deleteUser(userId)
  return result
}

async function updateUser(userId: string, payload: UserUpdate): User | boolean {
  const updatedUser = await UserRepo.updateUser(userId, payload)
  return updatedUser
}

export default {
  findOne,
  findAll,
  createOne,
  deleteUser,
  updateUser,
}
