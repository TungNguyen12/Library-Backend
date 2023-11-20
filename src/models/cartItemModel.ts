import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.ObjectId

const CartItemSchema = new Schema({
  cart_id: {
    type: ObjectId,
    ref: 'Cart',
  },
  copy_id: {
    type: ObjectId,
    ref: 'CopiesBook',
  },
})

export default mongoose.model('CartItem', CartItemSchema)
