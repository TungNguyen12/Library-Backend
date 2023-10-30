// Simulating the Database
import { v4 as uuid } from 'uuid'
import type { User } from '../types/User.js'
export class UserRepo {
  users = [
    {
      id: 'f54f322f-d4e2-4a12-93c6-8a1774bba9d0',
      firstName: 'Tuomas',
      lastName: 'Korhonen',
      email: 'tuomas@mail.com',
      address: 'Uudenmaankatu 1 A 3',
      phoneNumber: '123',
      role: 'user',
    },
    {
      id: '543f140d-5c83-4af8-865e-f825871b3642',
      firstName: 'Jere',
      lastName: 'Kokko',
      email: 'jere@mail.com',
      address: 'Vapaudenkatu 13 C 6',
      phoneNumber: '456',
      role: 'user',
    },
  ]

  findAll(): User[] {
    return this.users
  }

  findOne(userId: string): User | undefined {
    const user = this.users.find((user) => user.id === userId)

    return user
  }

  createOne(newUser: User): User {
    this.users = [...this.users, { ...newUser, id: uuid(), role: 'user' }]

    return newUser
  }

  deleteUser(userId: string): boolean {
    const foundIndex = this.users.findIndex((user) => user.id === userId)

    if (foundIndex === -1) {
      return false
    }

    this.users.splice(foundIndex, 1)
    return true
  }

  updateUser(userId: string, payload: Partial<User>): User | boolean {
    const foundIndex = this.users.findIndex((user) => user.id === userId)

    if (foundIndex === -1) {
      return false
    }

    this.users[foundIndex] = Object.assign(this.users[foundIndex], payload)
    return this.users[foundIndex]
  }
}
