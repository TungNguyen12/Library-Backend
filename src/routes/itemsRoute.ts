import express, {
  type Request,
  type Response,
} from 'express';

const router = express.Router()

const items: number[] = [1, 2, 3, 4, 5, 6]

router.get('/', (_, res: Response) => {
  res.json({ items })
})

router.get('/:itemIndex', (req: Request, res: Response) => {
  const index: number = parseInt(req.params.itemIndex, 10)
  if (isNaN(index) || index < 0 || index >= items.length) {
    res.status(404).json({ error: 'Item not found' })
  } else {
    res.json({ item: items[index] })
  }
})

export default router
