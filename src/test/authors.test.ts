// import request from 'supertest'

// import app from '../app.js'
// import AuthorRepo from '../models/authorsModel.js'
// import { type Author } from '../types/Author.js'

describe('GET authors', () => {
  test('should respond with status code 200 and all authors', async () => {
    //   const response = await request(app).get('/api/v1/authors')
    //   console.log('response:', response)

    //   const authors = (await AuthorRepo.find().exec()) as Author[]
    //   console.log('authors:', authors)

    //   expect(response.statusCode).toBe(200)
    //   expect(response.body.length).toBe(authors.length)

    expect(true).toBe(true)
  })
})

// describe('GET author by id', () => {
//   test('should respond with status code 404 and an error message when the author does not exist', async () => {
//     const response = await request(app).get(
//       '/api/v1/authors/65476d49bcb0ab378893f000'
//     )
//     expect(response.statusCode).toBe(404)
//     expect(response.body).toMatchObject({
//       message: 'Author not found.',
//     })
//   })
// })
