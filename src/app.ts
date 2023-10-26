import express from 'express'

import { entitiesMonitorMiddleware } from './middlewares/entitiesMonitoring.js'
import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import authorsRoutes from './routes/authorsRoutes.js'
import itemRoutes from './routes/itemsRoutes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(loggingMiddleware)
app.use(entitiesMonitorMiddleware)

// Routes
app.use('/api/v1/items', itemRoutes)
app.use('/api/v1/authors', authorsRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app
