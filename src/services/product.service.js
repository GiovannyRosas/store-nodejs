const faker = require('faker')
const boom = require('@hapi/boom')

const sequelize = require('../lib/sequelize')

class ProductsService {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 10

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    const query = 'SELECT * from tasks'
    const [data] = await sequelize.query(query)
    return data
  }

  findOne(id) {
    const product = this.products.find(
      (item) => item.id === id
    )
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block')
    }
    return product
  }

  update(id, changes) {
    const index = this.products.findIndex(
      (item) => item.id === id
    )
    if (index === -1) {
      throw boom.notFound('Product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  delete(id) {
    const index = this.products.findIndex(id)
    if (index === -1) {
      throw boom.notFound('Product not found')
    }
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = ProductsService
