/* eslint-disable @typescript-eslint/explicit-function-return-type */

// Simulating the Database
import type { User } from '../types/user.js'
export class UserRepo {
  users = [
    {
      id: 1,
      firstName: 'Tuomas',
      lastName: 'Korhonen',
      email: 'tuomas@mail.com',
      phoneNumber: '123',
      role: 'user',
    },
    {
      id: 2,
      firstName: 'Jere',
      lastName: 'Kokko',
      email: 'jere@mail.com',
      phoneNumber: '456',
      role: 'user',
    },
  ]

  findAll() {
    return this.users
  }

  findOne(userId: number) {
    const user = this.users.find((user) => user.id === userId)

    return user
  }

  createOne(newUser: User) {
    this.users = [...this.users, newUser]

    return newUser
  }
}
