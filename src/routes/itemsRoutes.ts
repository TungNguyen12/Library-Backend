import express from 'express'

import { getAllItems, getItemByIndex } from '../controllers/itemsController'

const router = express.Router()

router.get('/', getAllItems)
router.get('/:itemIndex', getItemByIndex)

export default router
