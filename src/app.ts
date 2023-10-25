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
app.use('/api/items', itemRoutes)
app.use('/api/authors', authorsRoutes)
<<<<<<< HEAD

// Error Handler
app.use(apiErrorHandler)
app.use(routeNotFound)
=======
>>>>>>> 672b4b4 (added requests for getting all authors or one by author id)

export default app
