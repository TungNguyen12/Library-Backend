import type { NextFunction } from 'express'
import UsersService from '../../services/usersService.js'
import { usersData } from '../mockData/usersData.js'
import usersController from '../../controllers/usersController.js'

describe('Users Controller Test', () => {
  let req: any
  let res: any
  let next: NextFunction

  beforeEach(() => {
    req = {
      body: jest.fn(),
      params: jest.fn(),
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }

    next = jest.fn() as NextFunction
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findAllUsers', () => {
    const findAllUsersMock = jest.spyOn(UsersService, 'findAll')

    it('should return all users', async () => {
      const users = usersData
      findAllUsersMock.mockResolvedValue(users)

      await usersController.findAllUsers(req, res)

      expect(findAllUsersMock).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith(users)
    })
  })

  describe('findOneUser', () => {
    const findOneUserMock = jest.spyOn(UsersService, 'findOne')

    it('should return one user', async () => {
      const user = usersData[0]
      const userId = String(user.id)
      findOneUserMock.mockResolvedValue(user)

      req.params = {
        userId,
      }

      await usersController.findOneUser(req, res, next)

      expect(findOneUserMock).toHaveBeenCalledWith(userId)
      expect(res.json).toHaveBeenCalledWith(user)
    })
  })
})
