function logErrors(e, req, res, next) {
  console.log('Log errors')
  console.error(e)
  next(e)
}

function errorHandler(e, req, res, next) {
  console.log('Error handler')
  res.status(500).json({
    message: e.message,
    stack: e.stack
  })
}

function boomErrorHandler(e, req, res, next) {
  if (e.isBoom) {
    const { output } = e
    res.status(output.statusCode).json(output.payload)
  }

  next(e)
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
}
