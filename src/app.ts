import express from 'express'

import { errorLoggingMiddleware } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import itemRoutes from './routes/itemsRoutes.js'

const app = express()

// Middleware
app.use(loggingMiddleware)
app.use(errorLoggingMiddleware)

// Routes
app.use('/api/items', itemRoutes)

export default app
