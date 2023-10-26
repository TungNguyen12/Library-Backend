import express from 'express'

import { crudCounterMiddleware } from './middlewares/crudCounterMiddleware.js'
import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import authorsRoutes from './routes/authorsRoutes.js'
import crudStatsRoutes from './routes/crudStatsRoutes.js'
import itemRoutes from './routes/itemsRoutes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(loggingMiddleware)
app.use(crudCounterMiddleware)

// Routes
app.use('/api/v1/items', itemRoutes)
app.use('/api/v1/authors', authorsRoutes)
app.use('/api/v1/crud-stats', crudStatsRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app
