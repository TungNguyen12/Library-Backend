/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { userSchema } from '../schemas/usersSchema.js'
import type { roleSchema } from '../schemas/rolesSchema.js'

import type { z } from 'zod'

import type mongoose from 'mongoose'

type UserDTO = z.infer<typeof userSchema>

export type User = UserDTO & { id: mongoose.Types.ObjectId }
export type UserUpdate = Omit<Partial<User>, 'id' | 'roles'>

export type UserRole = {
  title: string
}
export type Role = z.infer<typeof roleSchema> & { id: mongoose.Types.ObjectId }
