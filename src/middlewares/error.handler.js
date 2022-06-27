const { ValidationError } = require('sequelize')

function logErrors(e, req, res, next) {
  next(e)
}

function errorHandler(e, req, res) {
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

function ormErrorHandler(e, req, res, next) {
  if (e instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: e.name,
      errors: e.errors
    })
  }

  next(e)
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
}
