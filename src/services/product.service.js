const boom = require('@hapi/boom')

const { models } = require('../lib/sequelize')

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data)
    return newProduct
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category']
    })
    return products
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id)
    if (!product) {
      throw boom.notFound('Product not found')
    }
    return product
  }

  async update(id, changes) {
    const model = await this.findOne(id)
    const res = await model.update(changes)
    return res
  }

  async delete(id) {
    const model = await this.findOne(id)
    await model.destroy({ where: { id } })
    return { id }
  }
}

module.exports = ProductsService
