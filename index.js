import express from "express"

import itemsRoute from "./routes/itemsRoute.js"
import { loggingMiddleware } from "./middlewares/logging.js"
import { errorLoggingMiddleware } from "./middlewares/error.js"

const PORT = 8080
const app = express()

app.get("/hello", loggingMiddleware, (req, res) => {
  res.json({ msg: "hello, from Express.js!" })
})

app.use("/items", itemsRoute)

app.use(errorLoggingMiddleware)
app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`)
})
