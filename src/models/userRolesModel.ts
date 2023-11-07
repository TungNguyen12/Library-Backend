import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserRoleSchema = new Schema({
  title: String,
})

export default mongoose.model('UserRole', UserRoleSchema)
