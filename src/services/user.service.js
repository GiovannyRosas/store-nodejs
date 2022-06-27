const boom = require('@hapi/boom')

const { models } = require('./../lib/sequelize')

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data)
    return newUser
  }

  async find() {
    const user = await models.User.findAll({
      include: ['customer']
    })
    return user
  }

  async findById(id) {
    const user = await models.User.findByPk(id)
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }

  async update(id, changes) {
    const user = await this.findById(id)
    const res = await user.update(changes)
    return res
  }

  async delete(id) {
    const user = await this.findById(id)
    await user.destroy({ where: { id } })
    return { id }
  }
}

module.exports = UserService
