import type mongoose from 'mongoose'

export interface CartItem {
  cart_id: mongoose.Types.ObjectId
  book_id: mongoose.Types.ObjectId
}
