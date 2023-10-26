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

export default {
  findOne,
  findAll,
  createOne,
}
