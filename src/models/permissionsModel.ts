import mongoose from 'mongoose'

const { Schema } = mongoose

const permissionSchema = new Schema({
  action: String,
})

export default mongoose.model('Permission', permissionSchema)
