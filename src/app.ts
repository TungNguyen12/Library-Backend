import express from 'express'

import { entitiesMonitorMiddleware } from './middlewares/entitiesMonitoring.js'
import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import authorsRoutes from './routes/authorsRoutes.js'
import booksRoutes from './routes/bookRoutes.js'
import usersRoutes from './routes/usersRoutes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(loggingMiddleware)
app.use(entitiesMonitorMiddleware)

// Routes
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/authors', authorsRoutes)
app.use('/api/v1/books', booksRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app
