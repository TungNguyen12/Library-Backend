import mongoose from 'mongoose'

import { type CartItem } from '../types/CartItem.js'
import CartsRepo from '../models/cartsModel.js'
import CartItemRepo from '../models/cartItemModel.js'
import { type Cart } from '../types/Cart.js'

async function getAllCarts(): Promise<Cart[]> {
  const cartItems = await CartsRepo.find().exec()
  return cartItems as Cart[]
}

async function getAllCartItems(): Promise<CartItem[]> {
  const cartItems = await CartItemRepo.find().exec()
  return cartItems as CartItem[]
}

async function getCartByUserId(
  userId: string
): Promise<CartItem[] | null | Error> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const cart = await CartsRepo.findOne({ user_id: id })

    if (cart === null) {
      return cart
    }

    const cartId = cart._id
    const cartItems = await CartItemRepo.find({ cart_id: cartId }).exec()
    return cartItems as CartItem[]
  } catch (e) {
    const err = e as Error
    return err
  }
}

async function addToCart({
  userId,
  copyId,
}: {
  userId: string
  copyId: string
}): Promise<CartItem | undefined | Error> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    let cart = await CartsRepo.findOne({ user_id: id })

    if (cart === null) {
      const newCart = new CartsRepo({
        user_id: id,
      })
      await newCart.save()
      cart = newCart
    }

    const cartId = cart._id
    const newCartItem = new CartItemRepo({
      cart_id: cartId,
      copy_id: new mongoose.Types.ObjectId(copyId),
    })
    const res = await newCartItem.save()

    return res as CartItem | undefined
  } catch (e) {
    const err = e as Error
    return err
  }
}

async function removeFromCart({
  userId,
  copyId,
}: {
  userId: string
  copyId: string
}): Promise<CartItem | boolean | Error> {
  try {
    const id = new mongoose.Types.ObjectId(userId)
    const cart = await CartsRepo.findOne({ user_id: id })

    if (cart !== null) {
      const cartId = cart._id
      const cartItem = await CartItemRepo.findOne({
        cart_id: cartId,
        copy_id: new mongoose.Types.ObjectId(copyId),
      })

      if (!(cartItem instanceof Error || cartItem === null)) {
        await cartItem.deleteOne()
        return true
      }
    }

    return false
  } catch (e) {
    const err = e as Error
    return err
  }
}

export default {
  getAllCarts,
  getAllCartItems,
  getCartByUserId,
  addToCart,
  removeFromCart,
}
