/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import express from 'express'
import type { Response, Request } from 'express'

import authController from '../controllers/authsController.js'
import UsersController from '../controllers/usersController.js'
import {
  validateCreateUser,
  validateUpdateUser,
} from '../middlewares/userValidate.js'
import { checkAuth } from '../middlewares/checkAuth.js'
import passport from 'passport'
import type { User } from '../types/User.js'
import jwt from 'jsonwebtoken'

type WithUserRequest = Request & { user?: User }

const router = express.Router()

router.get('/', UsersController.findAllUsers)
router.post('/signup', validateCreateUser, authController.signup)
router.post('/signin', authController.signin)

router.post(
  '/login-google',
  passport.authenticate('google-id-token', { session: false }),
  (req: WithUserRequest, res: Response) => {
    console.log('request custom is here ❌❌.', req)
    const user = req.user

    if (user) {
      const payload = {
        userId: user.id,
        email: user.email,
      }

      const accessToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: '1h',
        }
      )
      res.json({ accessToken })
    }
  }
)

router.get('/:userId', UsersController.findOneUser)

router.post('/', validateCreateUser, UsersController.createNewUser)
router.delete('/:userId', UsersController.deleteUser)
router.put(
  '/:userId',
  checkAuth,
  validateUpdateUser,
  UsersController.updateUser
)

export default router
