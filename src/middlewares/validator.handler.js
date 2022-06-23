const boom = require('@hapi/boom')

function validatorHandler(schema, prop) {
  return (req, res, next) => {
    const data = req[prop]
    const { error } = schema.validate(data)
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}

module.exports = validatorHandler
