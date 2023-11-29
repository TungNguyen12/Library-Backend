import mongoose from 'mongoose'

import type { User } from '../../types/User.js'

export const usersData: User[] = [
  {
    id: new mongoose.Types.ObjectId('655c81c6155012574e0bd4af'),

    firstName: 'Phuoc',
    lastName: 'Nguyen',
    email: 'phuoc5@mail.com',
    address: 'UK',
    phoneNumber: '69696969',
    password: '$2b$10$mXmjpRM2cN6IfOMC2m1PDOOvRfiMqpueHmh3bD2aAHrNtZPVJbPlm',
  },

  {
    id: new mongoose.Types.ObjectId('655d1091fba90fb470aa806f'),

    firstName: 'potato',
    lastName: 'rotten',
    email: 'potato@vodka.uk',
    address: 'UK',
    phoneNumber: '69696969',
    password: '$2b$10$vylzaSE8WlgCISWK6hGKWeK11adb/Y7VMzBobhuu.77xCaNT4gOUq',
  },

  {
    id: new mongoose.Types.ObjectId('655e4ea5ad90a281f06aa8c3'),

    firstName: 'Tung',
    lastName: 'Nguyen',
    email: 'tung.nguyen1@integrify.io',
    address: 'DEFAULT',
    phoneNumber: 'DEFAULT',
    password: 'DEFAULT',
  },
]

export const convertedUsersData = usersData.map((user) => ({
  _id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  address: user.address,
  phoneNumber: user.phoneNumber,
  password: user.password,
}))