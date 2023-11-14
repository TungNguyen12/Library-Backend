import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  firstName: String,
  lastName: String,
  books: [String],
})

export default mongoose.model('Author', AuthorSchema)
