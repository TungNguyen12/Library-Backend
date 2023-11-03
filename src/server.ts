/* eslint-disable @typescript-eslint/no-floating-promises */
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import app from './app.js'

dotenv.config()

const PORT =
  process.env.PORT != null && process.env.PORT !== '' ? process.env.PORT : 8080

const dbUrl = process.env.DB_URL as string

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})

mongoose.connect(dbUrl).then(() => {
  console.log('Connected!')
})
