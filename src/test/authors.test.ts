import request from 'supertest'

import app from '../app.js'
import { AuthorRepo } from '../models/authorsModel.js'

const authorsRepo = new AuthorRepo()

describe('GET authors', () => {
  test('should respond with status code 200 and all authors', async () => {
    const response = await request(app).get('/api/v1/authors')
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(authorsRepo.getAll())
  })
})

describe('GET author by index', () => {
  test('should respond with status code 404 and an error message when the author does not exist', async () => {
    const response = await request(app).get(
      '/api/v1/authors/4756bb36-9e01-4246-a23f-9cfa66d89be8'
    )
    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      message: 'Author not found.',
    })
  })
})
