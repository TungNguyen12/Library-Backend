import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

// import UserRoleRepo from '../models/userRolesModel.js'
import UserRepo from '../models/usersModel.js'
import { type User, type UserDTO, type UserUpdate } from '../types/User.js'

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

async function findByEmail(email: string): Promise<User | null> {
  const user = await UserRepo.findOne({ email })
  return user as User | null
}

async function createUser(
  newUser: UserDTO,
  options = {}
): Promise<User | Error | null> {
  try {
    const isAvailable = await UserRepo.exists({ email: newUser.email })
    if (isAvailable === null) {
      const hashedPassword = bcrypt.hashSync(newUser.password, 10)
      newUser.password = hashedPassword
      const user = new UserRepo(newUser)
      await user.save(options)
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
  findByEmail,
  createUser,
  deleteUser,
  updateUser,
}
