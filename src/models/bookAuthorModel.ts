import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const BookAuthorSchema = new Schema({
  book_id: ObjectId,
  author_id: ObjectId,
})

export default mongoose.model('Book_Author', BookAuthorSchema)
