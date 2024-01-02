const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../config/db')

class Department extends Model {}

Department.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'department'
})

module.exports = Department