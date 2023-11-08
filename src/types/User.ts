/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { userSchema } from '../schemas/usersSchema.js'
import type { z } from 'zod'
// import type mongoose from 'mongoose'

type UserDTO = z.infer<typeof userSchema>

export type User = UserDTO & { id: string }
export type UserUpdate = Omit<Partial<User>, 'id' | 'roles'>
export type UserRole = {
  title: string
}
