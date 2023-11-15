import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const RolePermissionSchema = new Schema({
  role_id: { type: ObjectId, ref: 'Role' },
  permission_id: { type: ObjectId, ref: 'Permission' },
})

export default mongoose.model('RolePermission', RolePermissionSchema)
