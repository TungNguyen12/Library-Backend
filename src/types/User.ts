import type mongoose from 'mongoose'
import type { z } from 'zod'

import type { permissionSchema } from '../schemas/permissionsSchema.js'
import type { roleSchema } from '../schemas/rolesSchema.js'
import type { userSchema } from '../schemas/usersSchema.js'
import type { JwtPayload } from 'jsonwebtoken'

type ObjectId = mongoose.Types.ObjectId

// User
export type UserDTO = z.infer<typeof userSchema>
export type User = UserDTO & { id: ObjectId }
export type UserUpdate = Omit<Partial<User>, 'id'>
export interface DecodedUser extends JwtPayload {
  userId: string
  email: string
}

// User-Role (bridge table)

export type UserRole = {
  user_id: ObjectId
  role_id: ObjectId
}

export interface UserWithRole {
  user: User
  role: Role
}

// Role
export type Role = z.infer<typeof roleSchema> & { id: ObjectId }

// Role_Permission (bridge table)
export interface RolePermission {
  role_id: ObjectId
  permission_id: ObjectId
}

// Permission
export type Permission = z.infer<typeof permissionSchema> & {
  id: ObjectId
}
export type PermissionUpdate = Omit<Permission, 'id'>
