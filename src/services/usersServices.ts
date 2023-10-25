/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type User } from '../types/user.js'
import { UserRepo } from '../models/User.js'

const usersRepo = new UserRepo()

function findAll() {
  const users = usersRepo.findAll()

  return users
}
function findOne(userId: number) {
  const user = usersRepo.findOne(userId)

  return user
}
function createOne(newUser: User) {
  const user = usersRepo.createOne(newUser)
  return user
}

export default {
  findOne,
  findAll,
  createOne,
}
