import type { NextFunction, Request, Response } from 'express'

import UsersService from '../services/usersService.js'
import { ApiError } from '../utils/ApiError.js'

export async function findAllUsers(_: Request, res: Response): Promise<void> {
  const users = await UsersService.findAll()

  res.json(users)
}

export async function findOneUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.userId
  const user = await UsersService.findOne(userId)

  if (user === null) {
    next(ApiError.notFound('User not found'))
    return
  } else if (user instanceof Error) {
    next(ApiError.badRequest('Bad request.', user.message))
    return
  }
  res.json(user)
}

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newUser = req.body
  const user = await UsersService.createUser(newUser)
  if (user === null) {
    next(
      ApiError.badRequest('Email is not available, please insert another one')
    )
    return
  }
  res.status(201).json(user)
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const deletedUserId = req.params.userId
  const user = await UsersService.deleteUser(deletedUserId)

  if (user === null) {
    next(ApiError.notFound('User does not exist'))
    return
  } else if (user instanceof Error) {
    console.log(user.message)
    next(ApiError.badRequest('Bad request.', user.message))
    return
  }
  res.status(204).json(user)
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.userId
  const body = req.body
  const user = await UsersService.updateUser(userId, body)
  if (user === null) {
    next(ApiError.notFound('User not found'))
    return
  } else if (user instanceof Error) {
    next(ApiError.badRequest('Bad request.', user.message))
    return
  }

  res.json(user)
}

export async function addRoleToUserController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const body = req.body
  await UsersService.addRoleToUser(body.userId, body.roleId)
  res.json({})
}

export default {
  findOneUser,
  findAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  addRoleToUserController,
}
