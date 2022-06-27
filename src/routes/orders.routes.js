const express = require('express')
const router = express.Router()

const validatorHandler = require('./../middlewares/validator.handler')
const {
  getOrderSchema,
  createOrderSchema
} = require('./../schemas/order.schema')

const OrderService = require('./../services/order.service')

const orderService = new OrderService()

router.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.find()
    res.json(orders)
  } catch (e) {
    next(e)
  }
})

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await orderService.findOne(id)
      res.json(order)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newOrder = await orderService.create(body)
      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
