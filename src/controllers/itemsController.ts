import { type NextFunction, type Request, type Response } from 'express'

import * as itemModel from '../models/itemModel.js'
import { ApiError } from '../utils/ApiError.js'

export const getAllItemsController = (_: Request, res: Response): void => {
  const items = itemModel.getAllItems()
  res.json({ items })
}

export const getItemByIndexController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const index: number = parseInt(req.params.itemIndex)
  const item = itemModel.getItemByIndex(index)

  if (item == null) {
    next(ApiError.notFound('Item not found'))
    return
  }

  res.json({ item })
}
