const express = require('express')

const validatorHandler = require('./../middlewares/validator.handler')
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require('./../schemas/category.schema')
const CategoryService = require('../services/category.service')

const router = express.Router()

const categoryService = new CategoryService()

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryService.find()
    res.json(categories)
  } catch (e) {
    next(e)
  }
})

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await categoryService.findOne(id)
      res.json(category)
    } catch (e) {
      next(e)
    }
  }
)

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newCategory = await categoryService.create(body)
      res.status(201).json(newCategory)
    } catch (e) {
      next(e)
    }
  }
)

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const updateCategory = await categoryService.update(
        id,
        body
      )
      res.json(updateCategory)
    } catch (e) {
      next(e)
    }
  }
)

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await categoryService.delete(id)
      res.status(201).json({ id })
    } catch (e) {
      next(e)
    }
  }
)

module.exports = router
