import CategoryModel from '../../models/categoriesModel.js'
import categoriesService from '../../services/categoriesService.js'
import connect, { type MongoHelper } from '../db-helper.js'
import { convertedCategoryData } from '../mockData/booksData.js'

describe('Category service', () => {
  let mongoHelper: MongoHelper
  beforeAll(async () => {
    mongoHelper = await connect()
  })
  beforeEach(async () => {
    await CategoryModel.create(convertedCategoryData[0])
  })

  afterEach(async () => {
    await mongoHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongoHelper.closeDatabase()
  })

  describe('get all categories', () => {
    it('Should return all categories', async () => {
      const result = await categoriesService.getAll()
      expect(result).toHaveLength(1)
    })
  })
})
