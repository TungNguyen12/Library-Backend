import mongoose from 'mongoose'

const { Schema } = mongoose

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  address: String,
  phoneNumber: String,
  roles: [{ type: Schema.Types.ObjectId, ref: 'UserRole' }],
})

export default mongoose.model('User', userSchema)
