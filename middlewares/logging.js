export function loggingMiddleware(req, _, next) {
  console.log("👀 [INFO]: ", req.method, req.path)
  next()
}
