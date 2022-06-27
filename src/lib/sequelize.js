const { Sequelize } = require('sequelize')

const { config } = require('./../config/config')
const setUpModels = require('./../db/models/index')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPass)
const URI =
  process.env.URI ||
  `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true
})

setUpModels(sequelize)

module.exports = sequelize
