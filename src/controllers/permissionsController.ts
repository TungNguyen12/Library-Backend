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

export async function findOnePermission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const permissionId = req.params.permissionId
  const permission = await PermissionsService.findOne(permissionId)

  if (permission === null) {
    next(ApiError.notFound('Permission not found'))
    return
  } else if (permission instanceof Error) {
    console.log('permissionsController:', permission.message)
    next(ApiError.badRequest('Bad request.', permission.message))
    return
  }

  res.json(permission)
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

export async function deletePermission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const deletedPermissionId = req.params.permissionId
  const permission =
    await PermissionsService.deletePermission(deletedPermissionId)

  if (permission === null) {
    next(ApiError.notFound('Permission does not exist'))
    return
  } else if (permission instanceof Error) {
    next(ApiError.badRequest('Bad request.', permission.message))
    return
  }
  res.status(204).json(permission)
}

export async function updatePermission(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const permissionId = req.params.permissionId
  const body = req.body
  const user = await PermissionsService.updatePermission(permissionId, body)
  if (user === null) {
    next(ApiError.notFound('User not found'))
    return
  } else if (user instanceof Error) {
    next(ApiError.badRequest('Bad request.', user.message))
    return
  }

  res.json(user)
}

export default {
  findAllPermissions,
  findOnePermission,
  createNewPermission,
  deletePermission,
  updatePermission,
}
