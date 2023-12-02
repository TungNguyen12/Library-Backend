import express from 'express'

import CartsController from '../controllers/cartsController.js'

const router = express.Router()

router.get('/', CartsController.getAllCarts)
router.get('/items', CartsController.getAllCartItems)
router.get('/:userId', CartsController.getCartByUserId)
router.put('/:userId', CartsController.addToCart)
router.post('/:userId/checkout', CartsController.checkout)
router.delete('/:userId/:bookId', CartsController.removeFromCart)
router.delete('/:userId', CartsController.deleteCart)

export default router
