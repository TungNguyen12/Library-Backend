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

async function deleteUser(userId: string): Promise<number | Error> {
  try {
    const result = await UserRepo.deleteOne({ _id: userId }).exec()

    if (result.deletedCount === 0) {
      console.log(`No user with _id ${userId} found.`)
    } else {
      console.log(`User with _id ${userId} deleted successfully.`)
    }

    return result.deletedCount
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function updateUser(
  userId: string,
  payload: UserUpdate
): Promise<boolean | Error> {
  try {
    const updatedUser = await UserRepo.updateOne(
      { _id: userId },
      payload
    ).exec()

    if (updatedUser.modifiedCount === 1) {
      return true
    } else {
      throw new Error()
    }
  } catch (e) {
    const error = e as Error
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
