import express from 'express'

import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import itemRoutes from './routes/itemsRoutes.js'
import authorsRoutes from './routes/authorsRoutes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(loggingMiddleware)

// Routes
app.use('/api/v1/items', itemRoutes)
app.use('/api/v1/authors', authorsRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app
