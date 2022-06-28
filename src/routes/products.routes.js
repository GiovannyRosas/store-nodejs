const express = require('express')

const ProductsService = require('../services/product.service')

const validatorHandler = require('../middlewares/validator.handler')
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} = require('../schemas/product.schema')

const router = express.Router()

const productService = new ProductsService()

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await productService.find(req.query)
      res.json(products)
    } catch (e) {
      next(e)
    }
  }
)

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await productService.findOne(id)

      res.json(product)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const createdProduct = await productService.create(
        body
      )
      res.status(201).json(createdProduct)
    } catch (e) {
      next(e)
    }
  }
)

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await productService.update(id, body)

      res.json(product)
    } catch (e) {
      next(e)
    }
  }
)

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const productDeleted = await productService.delete(id)

  res.json(productDeleted)
})

module.exports = router
