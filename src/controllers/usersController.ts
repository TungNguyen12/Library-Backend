import type { NextFunction, Request, Response } from 'express'

import UsersServices from '../services/usersServices.js'
import { ApiError } from '../utils/ApiError.js'

export function findAllUsers(_: Request, res: Response): void {
  const users = UsersServices.findAll()

  res.json({ users })
}

export function findOneUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const userId = req.params.userId
  const user = UsersServices.findOne(userId)

  if (user === undefined) {
    next(ApiError.notFound('User not found'))
    return
  }
  res.json({ user })
}

export function createNewUser(req: Request, res: Response): void {
  const newUser = req.body
  const user = UsersServices.createOne(newUser)
  res.status(201).json({ user })
}

export function deleteUser(req: Request, res: Response): void {
  const deletedUserId = Number(req.params.userId)
  const user = 'fsdfs'
  UsersServices.deleteUser(deletedUserId)

  if (user === undefined) {
    next(ApiError.notFound('User not found'))
    return
  }
  res.json({ user })
}

export default {
  findOneUser,
  findAllUsers,
  createNewUser,
  deleteOneUser,
}
