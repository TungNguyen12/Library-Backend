import mongoose from 'mongoose'

const Schema = mongoose.Schema

const StatsSchema = new Schema({
  name: String,
  data: Object,
})

export default mongoose.model('Stats', StatsSchema)
