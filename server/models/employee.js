const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

class Employee extends Model {}

Employee.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hometown: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isManager: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  managerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'employees',
      key: 'id'
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'employee'
});

module.exports = Employee;
