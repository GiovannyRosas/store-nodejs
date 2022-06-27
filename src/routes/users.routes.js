const express = require('express')

const UserService = require('../services/user.service')

const validatorHandler = require('../middlewares/validator.handler')
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema
} = require('../schemas/user.schema')

const router = express.Router()

const userService = new UserService()

router.get('/', async (req, res) => {
  const products = await userService.find()
  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await userService.findById(id)

      res.json(product)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await userService.create(body)
      res.status(201).json(newUser)
    } catch (e) {
      next(e)
    }
  }
)

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await userService.update(id, body)

      res.json(product)
    } catch (e) {
      next(e)
    }
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const productDeleted = await userService.delete(id)

  res.json(productDeleted)
})

module.exports = router
