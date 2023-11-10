import mongoose, { Schema } from 'mongoose'

const schema = Schema
const ObjectId = schema.ObjectId

const BookSchema = new Schema({
  ISBN: String,
  title: String,
  edition: String,
  category: String,
  description: String,
  publisher: String,
  author: [String],
})

const CopiesBooksSchema = new Schema({
  book_id: { type: ObjectId, ref: 'Book' },
  is_Available: Boolean,
})

const BorrowedBookSchema = new Schema({
  copy_id: { type: ObjectId, ref: 'CopiesBook' },
  user_id: String, // temp
  borrowed_Date: Date,
  returned_Date: Date,
})

export const BookModel = mongoose.model('Book', BookSchema)
export const CopiesBookModel = mongoose.model('CopiesBook', CopiesBooksSchema)
export const BorrowedBookModel = mongoose.model(
  'BorrowedBook',
  BorrowedBookSchema
)
