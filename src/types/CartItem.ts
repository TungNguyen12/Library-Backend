import type mongoose from 'mongoose'

export interface CartItem {
  cart_id: mongoose.Types.ObjectId
  copy_id: mongoose.Types.ObjectId
}
