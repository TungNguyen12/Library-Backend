import { type Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import type mongoose from 'mongoose'
import type { z } from 'zod'

import type { permissionSchema } from '../schemas/permissionsSchema.js'
import type { roleSchema } from '../schemas/rolesSchema.js'
import type { userCreateSchema, userSchema } from '../schemas/usersSchema.js'

type ObjectId = mongoose.Types.ObjectId

// User
export type UserDTO = z.infer<typeof userSchema>
export type User = UserDTO & { id: ObjectId }
export type UserUpdate = Omit<Partial<User>, 'id'>
export type UserCreate = z.infer<typeof userCreateSchema>
export interface DecodedUser extends JwtPayload {
  userId: string
  email: string
}

export interface WithAuthRequest extends Request {
  decoded?: DecodedUser
}
// User-Role (bridge table)

export interface UserRole {
  user_id: ObjectId
  role_id: ObjectId
}

export interface UserWithRole {
  user_id: User
  role_id: Role
}

// Role
export type RoleDTO = z.infer<typeof roleSchema>
export type Role = RoleDTO & { id: ObjectId }
export type RoleWithPermissions = Role & {
  permissions: Permission[]
}

// Role_Permission (bridge table)
export type RolePermission = {
  role_id: ObjectId
  permission_id: ObjectId
}

// Permission
export type Permission = z.infer<typeof permissionSchema> & {
  id: ObjectId
}
export type PermissionUpdate = Omit<Permission, 'id'>
