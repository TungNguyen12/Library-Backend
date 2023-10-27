import type { userSchema } from '../schemas/usersSchema.js'
import type { z } from 'zod'

type UserDTO = z.infer<typeof userSchema>

export type User = UserDTO & { id: string; role: string }
export type UserUpdate = Omit<Partial<User>, 'id' | 'role'>
