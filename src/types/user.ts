import type { userSchema } from '../schemas/usersSchema.js'
import type { z } from 'zod'

// export interface User {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   phoneNumber: string
//   role: string
// }

type UserDTO = z.infer<typeof userSchema>

export type User = UserDTO & { id: string; role: string }
export type UserUpdate = Partial<User>
