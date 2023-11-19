import { type NextFunction, type Request, type Response } from 'express'

import authsService from '../services/authsService.js'
import { ApiError } from '../utils/ApiError.js'
import type { UserCreate } from '../types/User.js'

async function signin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { email, password } = req.body

  const credencial = { email, password }
  try {
    const accessToken = await authsService.signin(credencial)
    if (accessToken === null) {
      next(ApiError.notFound('User not found'))
      return
    } else if (accessToken instanceof Error) {
      next(ApiError.badRequest('Bad request.', accessToken.message))
      return
    }
    res.json({ accessToken })
  } catch (err) {
    next(ApiError.internal('Internal server error'))
  }
}

async function signup(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
    } = req.body
    const user: UserCreate = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      address,
    }
    const accessToken = await authsService.signup(user)
    res.status(201).json({ accessToken })
  } catch (error) {
    if (error instanceof ApiError) {
      next(error)
    } else {
      next(ApiError.internal('Internal server error'))
    }
  }
}

export default {
  signin,
  signup,
}
