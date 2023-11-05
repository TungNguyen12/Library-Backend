import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const AuthorSchema = new Schema({
  id: ObjectId,
  firstName: String,
  lastName: String,
  books: [String],
})

export default mongoose.model('Author', AuthorSchema)
