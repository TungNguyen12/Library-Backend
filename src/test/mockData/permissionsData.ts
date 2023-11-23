import mongoose from 'mongoose'

import { type BasicPermission } from '../../types/Permission.js'

const ObjectId = mongoose.Types.ObjectId

export const permissionsData: Array<
  Partial<BasicPermission & { _id: mongoose.Types.ObjectId }>
> = [
  {
    _id: new ObjectId('6546a7febac08f6bd30c0505'),
    action: 'USERS_CREATE',
  },
]
