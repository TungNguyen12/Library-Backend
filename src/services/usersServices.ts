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

async function createOne(newUser: User): Promise<User | Error | null> {
  try {
    const isAvailable = await UserRepo.exists({ email: newUser.email }).exec()

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
    const result = await UserRepo.findByIdAndDelete(userId).exec()
    return result as User
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
    const updatedUser = await UserRepo.findOneAndUpdate(
      { _id: userId },
      payload
    ).exec()

    return updatedUser as User
  } catch (e) {
    const error = e as Error
    console.log(e)
    return error
  }
}

export default {
  findOne,
  findAll,
  createOne,
  deleteUser,
  updateUser,
}
