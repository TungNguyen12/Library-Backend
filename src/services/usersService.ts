import { type UserUpdate, type User } from '../types/User.js'
import UserRepo from '../models/userModel.js'

async function findAll(): Promise<User[]> {
  const users = await UserRepo.find().populate('roles').exec()
  return users as unknown as User[]
}

async function findOne(userId: string): Promise<User | Error | null> {
  try {
    const user = await UserRepo.findOne({ _id: userId }).populate('roles')
    return user as unknown as User
  } catch (e) {
    const error = e as Error
    return error
  }
}

async function createUser(newUser: User): Promise<User | Error | null> {
  try {
    const isNotAvailable = await UserRepo.exists({ email: newUser.email })
    if (isNotAvailable === null) {
      const user = await UserRepo.create(newUser)
      return user as unknown as User
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
    return result as unknown as User
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

    return updatedUser as unknown as User
  } catch (e) {
    const error = e as Error
    console.log(e)
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
