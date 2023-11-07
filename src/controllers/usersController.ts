import type { NextFunction, Request, Response } from 'express'

import UsersServices from '../services/usersServices.js'
import { ApiError } from '../utils/ApiError.js'

export async function findAllUsers(_: Request, res: Response): Promise<void> {
  const users = await UsersServices.findAll()

  res.json({ users })
}

export async function findOneUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.userId
  const user = await UsersServices.findOne(userId)

  if (user === undefined) {
    next(ApiError.notFound('User not found'))
    return
  }
  res.json({ user })
}

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newUser = req.body
  const user = await UsersServices.createOne(newUser)
  if (user === null) {
    next(
      ApiError.badRequest('Email is not available, please insert another one')
    )
    return
  }
  res.status(201).json({ user })
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const deletedUserId = req.params.userId
  const user = await UsersServices.deleteUser(deletedUserId)

  if (user === null) {
    next(ApiError.notFound('User not found'))
    return
  }
  res.json({ user })
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.userId
  const body = req.body
  const result = await UsersServices.updateUser(userId, body)

  if (result === null) {
    next(ApiError.notFound('User not found'))
    return
  } else if (result instanceof Error) {
    next(ApiError.badRequest('Bad require'))
  }

  res.json(result)
}

export default {
  findOneUser,
  findAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
}
