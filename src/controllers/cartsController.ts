import { type NextFunction, type Request, type Response } from 'express'

import { ApiError } from '../utils/ApiError.js'
import CartsService from '../services/cartsService.js'

async function getAllCarts(_: Request, res: Response): Promise<void> {
  const carts = await CartsService.getAllCarts()
  res.json(carts)
}

async function getAllCartItems(_: Request, res: Response): Promise<void> {
  const cartItems = await CartsService.getAllCartItems()
  res.json(cartItems)
}

async function getCartByUserId(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const id = req.params.userId
  const cartItems = await CartsService.getCartByUserId(id)

  if (cartItems === null) {
    next(ApiError.notFound('Cart not found.'))
    return
  } else if (cartItems instanceof Error) {
    next(ApiError.badRequest('Bad request.', cartItems.message))
    return
  }

  res.json(cartItems)
}

async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.userId
  const bookId = req.body.book_id

  const result = await CartsService.addToCart({ userId, bookId })

  if (result instanceof Error) {
    next(ApiError.badRequest('Bad request.', result.message))
    return
  } else if (result === undefined) {
    next(ApiError.internal('Something went wrong.'))
    return
  }

  res.status(201).json(result)
}

async function removeFromCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.userId
  const bookId = req.body.book_id

  if (bookId === undefined) {
    next(
      ApiError.badRequest('Bad request.', 'Missing book_id in request body.')
    )
    return
  }

  const result = await CartsService.removeFromCart({ userId, bookId })

  if (result instanceof Error) {
    next(ApiError.badRequest('Bad request.', result.message))
    return
  } else if (result === undefined) {
    next(ApiError.internal('Something went wrong.'))
    return
  }

  res.sendStatus(204)
}

export default {
  getAllCarts,
  getAllCartItems,
  getCartByUserId,
  addToCart,
  removeFromCart,
}
