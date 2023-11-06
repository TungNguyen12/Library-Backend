import { GenericContainer } from 'testcontainers'
import request from 'supertest'
import mongoose from 'mongoose'

import AuthorRepo from '../models/authorsModel.js'
import app from '../app.js'
import { authorsData } from './authorsData.js'

let mongoDbContainer: any

beforeAll(async () => {
  mongoDbContainer = await new GenericContainer('mongo')
    .withExposedPorts(27017)
    .start()

  mongoose
    .connect(`mongodb://localhost:${mongoDbContainer.getMappedPort(27017)}`)
    .catch((err) => {
      throw err
    })
})

beforeEach(async () => {
  for (const author of authorsData) {
    const newAuthor = new AuthorRepo(author)
    await newAuthor.save()
  }
})

afterEach(async () => {
  await AuthorRepo.deleteMany({})
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoDbContainer.stop()
})

describe('GET /authors', () => {
  test('should respond with status code 200 and all authors', async () => {
    const response = await request(app).get('/api/v1/authors')
    const authors = response.body

    expect(response.statusCode).toBe(200)
    expect(authors.length).toBe(authorsData.length)
  })
})

describe('GET /author/authorId', () => {
  test('should respond with status code 404 and an error message when the author does not exist', async () => {
    const response = await request(app).get(
      '/api/v1/authors/65476d49bcb0ab378893f000'
    )

    expect(response.statusCode).toBe(404)
    expect(response.body).toMatchObject({
      message: 'Author not found.',
    })
  })
})
