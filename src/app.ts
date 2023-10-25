import express from 'express'

import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import itemRoutes from './routes/itemsRoutes.js'

const app = express()

// Middleware
app.use(loggingMiddleware)

// Routes
app.use('/api/items', itemRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app
