import type { NextFunction, Request, Response } from 'express'

import PermissionsService from '../services/permissionsService.js'
import { ApiError } from '../utils/ApiError.js'
import { type ExtendedResponse } from '../utils/responseExtensions.js'

const permissionsController = {
  async findAllPermissions(_: Request, res: Response): Promise<void> {
    const permissions = await PermissionsService.findAll()
    res.ok(permissions)
  },

  async findOnePermission(
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
  ): Promise<void> {
    const permissionId = req.params.permissionId
    const permission = await PermissionsService.findById(permissionId)

    if (permission instanceof ApiError) {
      next(permission)
      return
    }

    res.ok(permission)
  },

  async createNewPermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const newPermission = req.body
    const permission = await PermissionsService.createPermission(newPermission)

    if (permission instanceof ApiError) {
      next(permission)
      return
    }

    res.created(permission)
  },

  async deletePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const deletedPermissionId = req.params.permissionId
    const permission =
      await PermissionsService.deletePermission(deletedPermissionId)

    if (permission instanceof ApiError) {
      next(permission)
      return
    }
    res.deleted()
  },

  async updatePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const permissionId = req.params.permissionId
    const body = req.body
    const permission = await PermissionsService.updatePermission(
      permissionId,
      body
    )

    if (permission instanceof ApiError) {
      next(permission)
      return
    }

    res.ok(permission)
  },
}

export default permissionsController
