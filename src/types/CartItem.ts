import type mongoose from 'mongoose'

export type CartItem = {
  cart_id: mongoose.Types.ObjectId
  books: mongoose.Types.ObjectId[]
}

export type PopulatedCartItem = Omit<CartItem, 'books' | 'book_id'> & {
  books: Array<{
    id: mongoose.Types.ObjectId
    title: string
    description: string
    author: Array<{
      id: mongoose.Types.ObjectId
      fullName: string
    }>
    img: string
  }>
}
