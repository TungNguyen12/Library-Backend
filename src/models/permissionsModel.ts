import mongoose from 'mongoose'

const { Schema } = mongoose

const permissionSchema = new Schema({
  action: String,
})
const PermissionRepo = mongoose.model('Permission', permissionSchema)

export default PermissionRepo
