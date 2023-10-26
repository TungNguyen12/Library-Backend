import { type User } from '../types/user.js'
import { UserRepo } from '../models/User.js'

const usersRepo = new UserRepo()

function findAll(): User[] {
  const users = usersRepo.findAll()

  return users
}

function findOne(userId: string): User | undefined {
  const user = usersRepo.findOne(userId)

  return user
}

function createOne(newUser: User): User {
  const user = usersRepo.createOne(newUser)
  return user
}

function deleteUser(userId: string): boolean {
  const result = usersRepo.deleteUser(userId)
  return result
}

function updateUser(userId: string, payload: Partial<User>): User | boolean {
  const updatedUser = usersRepo.updateUser(userId, payload)
  return updatedUser
}

export default {
  findOne,
  findAll,
  createOne,
  deleteUser,
  updateUser,
}
