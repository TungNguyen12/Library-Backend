import type { NextFunction, Request, Response } from 'express'

import UserRolesServices from '../services/userRolesService.js'
import { ApiError } from '../utils/ApiError.js'

export async function findAllUserRoles(
  _: Request,
  res: Response
): Promise<void> {
  const userRoles = await UserRolesServices.findAll()

  res.json({ userRoles })
}

export async function createNewUserRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newRole = req.body
  const role = await UserRolesServices.createUserRole(newRole)
  if (role === null) {
    next(
      ApiError.badRequest(
        'This ROLE is not available, please insert another one'
      )
    )
    return
  }
  res.status(201).json({ role })
}

export default {
  findAllUserRoles,
  createNewUserRole,
}
