import type { NextFunction, Request, Response } from 'express'
import PermissionsService from '../services/permissionsService.js'
import { ApiError } from '../utils/ApiError.js'

export async function findAllPermissions(
  _: Request,
  res: Response
): Promise<void> {
  const permissions = await PermissionsService.findAll()
  res.json(permissions)
}

export async function createNewPermission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const newPermission = req.body
  const permission = await PermissionsService.createPermission(newPermission)
  if (permission === null) {
    next(
      ApiError.badRequest(
        'This PERMISSION already exists, please insert another one'
      )
    )
    return
  }
  res.status(201).json(permission)
}

export default {
  findAllPermissions,
  createNewPermission,
}
