/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import GoogleTokenStrategy from 'passport-google-id-token'

import UserRepo from '../models/usersModel.js'
import { ApiError } from '../utils/ApiError.js'

export function loginWithGoogle(): GoogleTokenStrategy {
  return new GoogleTokenStrategy(
    { clientID: process.env.GOOGLE_CLIENT_ID as string },
    async function (parsedToken, googleId, done) {
      console.log(
        'THIS IS USER INFO FROM GOOGLE: 😶‍🌫️😶‍🌫️😶‍🌫️',
        parsedToken.payload,
        googleId
      )
      const email = parsedToken.payload.email

      try {
        let user = await UserRepo.findOne({ email })

        if (!user) {
          const newUser = new UserRepo({
            firstName: parsedToken.payload.given_name,
            lastName: parsedToken.payload.family_name,
            email,
            address: 'DEFAULT',
            phoneNumber: 'DEFAULT',
            password: 'DEFAULT',
          })

          await newUser.save()
          user = newUser
        }

        done(false, user)
      } catch (e) {
        return done(ApiError.forbidden('Google authentication failed'))
      }
    }
  )
}
