import { type Request, type Response } from 'express'

import * as itemModel from '../models/itemModel.js'

export const getAllItemsController = (_: Request, res: Response): void => {
  const items = itemModel.getAllItems()
  res.json({ items })
}

export const getItemByIndexController = (req: Request, res: Response): void => {
  const index: number = parseInt(req.params.itemIndex)
  const item = itemModel.getItemByIndex(index)
  if (item == null) {
    res.status(404).json({ error: 'Item not found' })
  } else {
    res.json({ item })
  }
}
