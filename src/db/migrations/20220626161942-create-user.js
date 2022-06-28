'use strict'

const { DataTypes, Sequelize } = require('sequelize')

const { USER_TABLE } = require('./../models/user.model')

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE)
  }
}
