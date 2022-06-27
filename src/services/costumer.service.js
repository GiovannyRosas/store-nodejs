const boom = require('@hapi/boom')
const { models } = require('../lib/sequelize')

class CustomerService {
  constructor() {}

  async find() {
    const res = await models.Customer.findAll({
      include: ['user']
    })

    return res
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id)
    if (!customer) {
      throw boom.notFound('Customer not found')
    }
    return customer
  }

  async create(data) {
    const newCostumer = await models.Customer.create(data, {
      include: ['user']
    })
    return newCostumer
  }

  async update(id, changes) {
    const model = await this.findOne(id)
    const res = await model.update(changes)
    return res
  }

  async delete(id) {
    const model = await this.findOne(id)
    await model.destroy({ where: { id } })
    return { res: true }
  }
}

module.exports = CustomerService
