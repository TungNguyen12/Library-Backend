/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { userSchema } from '../schemas/usersSchema.js'
import type { roleSchema } from '../schemas/rolesSchema.js'
import type { permissionSchema } from '../schemas/permissionsSchema.js'

import type { z } from 'zod'

import type mongoose from 'mongoose'

type ObjectId = mongoose.Types.ObjectId

// User
type UserDTO = z.infer<typeof userSchema>
export type User = UserDTO & { id: ObjectId }
export type UserUpdate = Omit<Partial<User>, 'id' | 'roles'>

// User-Role (bridge table)
export type UserRole = {
  user_id: ObjectId
  role_id: ObjectId
}

// Role
export type Role = z.infer<typeof roleSchema> & { id: ObjectId }

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
