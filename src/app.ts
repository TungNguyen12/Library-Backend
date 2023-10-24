import express from 'express'

import { errorLoggingMiddleware } from './middlewares/error'
import { loggingMiddleware } from './middlewares/logging'
import itemRoutes from './routes/itemsRoutes'

const app = express()

// Middleware
app.use(loggingMiddleware)
app.use(errorLoggingMiddleware)

// Routes
app.use('/api/items', itemRoutes)

export default app
