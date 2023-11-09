import express from 'express'

import { crudCounterMiddleware } from './middlewares/crudCounterMiddleware.js'
import { entitiesMonitorMiddleware } from './middlewares/entitiesMonitoring.js'
import { apiErrorHandler } from './middlewares/error.js'
import { loggingMiddleware } from './middlewares/logging.js'
import { routeNotFound } from './middlewares/routeNotFound.js'
import authorsRoutes from './routes/authorsRoutes.js'
import booksRoutes from './routes/bookRoutes.js'
import crudStatsRoutes from './routes/crudStatsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import userRolesRoutes from './routes/userRolesRoutes.js'

const app = express()

// Middleware
app.use(express.json())
app.use(loggingMiddleware)
app.use(entitiesMonitorMiddleware)
app.use(crudCounterMiddleware)

// Routes
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/authors', authorsRoutes)
app.use('/api/v1/books', booksRoutes)
app.use('/api/v1/crud-stats', crudStatsRoutes)
app.use('/api/v1/user-roles', userRolesRoutes)

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)

export default app
