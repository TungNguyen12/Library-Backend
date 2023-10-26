import request from 'supertest'

import app from '../app.js'
import { getAllItems } from '../models/itemModel.js'

describe('GET /api/items', () => {
  test('should respond with status code 200 and all items', async () => {
    const response = await request(app).get('/api/v1/items')
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(getAllItems())
  })
})

describe('GET /api/items/:itemIndex', () => {
  test('should respond with status code 200 and the item at the specified index', async () => {
    const response = await request(app).get('/api/v1/items/1')
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(getAllItems()[0])
  })

  test('should respond with status code 404 and an error message when the item does not exist', async () => {
    const response = await request(app).get('/api/v1/items/100')
    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      msg: 'Item not found',
    })
  })
})
