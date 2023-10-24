import express from 'express'

import {
  getAllItemsController,
  getItemByIndexController,
} from '../controllers/itemsController.js'

const router = express.Router()

router.get('/', getAllItemsController)
router.get('/:itemIndex', getItemByIndexController)

export default router
