export function errorLoggingMiddleware(error, req, res, next) {
  console.log("👀 ERRROOOR!!")
  res.json({ msg: "ERROR!!!!" })
}
