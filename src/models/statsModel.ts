import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  name: String,
  data: Object,
})

export default mongoose.model('Stats', AuthorSchema)
