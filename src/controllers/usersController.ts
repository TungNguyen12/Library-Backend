/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextFunction, Request, Response } from 'express'

import UsersServices from '../services/usersServices.js'
import { ApiError } from '../utils/ApiError.js'

export function findAllUsers(_: Request, res: Response) {
  const users = UsersServices.findAll()

  res.json({ users })
}

export function findOneUser(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.userId)
  const user = UsersServices.findOne(userId)

  if (user === undefined) {
    next(ApiError.notFound('User not found'))
    return
  }
  res.json({ user })
}

export function createOneUser(req: Request, res: Response) {
  const newUser = req.body
  const user = UsersServices.createOne(newUser)
  res.status(201).json({ user })
}

export default {
  findOneUser,
  findAllUsers,
  createOneUser,
}
