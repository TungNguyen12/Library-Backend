import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserRoleSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  role: { type: ObjectId, ref: 'Role' },
})

export default mongoose.model('UserRole', UserRoleSchema)
