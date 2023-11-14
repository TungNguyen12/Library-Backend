import mongoose from 'mongoose'

import UserRoleRepo from '../models/userRolesModel.js'

async function findAll() {
  const users = await UserRoleRepo.find()
  return users
}

async function findByUserId(userId: string) {
  const id = new mongoose.Types.ObjectId(userId)
  const user = await UserRoleRepo.find({ user_id: id })
  return user
}

export default {
  findAll,
  findByUserId,
}
