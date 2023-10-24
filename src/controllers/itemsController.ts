import { type Request, type Response } from 'express'

import { getAllItems, getItemByIndex } from '../models/itemModel'

export const getAllItemsController = (_: Request, res: Response): void => {
  const items = getAllItems()
  res.json({ items })
}

export const getItemByIndexController = (req: Request, res: Response): void => {
  const index: number = parseInt(req.params.itemIndex)
  const item = getItemByIndex(index)
  if (item == null) {
    res.status(404).json({ error: 'Item not found' })
  } else {
    res.json({ item })
  }
}
export { getAllItems, getItemByIndex }
