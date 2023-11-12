/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { userSchema } from '../schemas/usersSchema.js'
import type { roleSchema } from '../schemas/rolesSchema.js'

import type { z } from 'zod'

import type mongoose from 'mongoose'

// User
type UserDTO = z.infer<typeof userSchema>
export type User = UserDTO & { id: mongoose.Types.ObjectId }
export type UserUpdate = Omit<Partial<User>, 'id' | 'roles'>

// User-Role (bridge table)
export type UserRole = {
  user_id: mongoose.Types.ObjectId
  role_id: mongoose.Types.ObjectId
}

// Role
export type Role = z.infer<typeof roleSchema> & { id: mongoose.Types.ObjectId }
