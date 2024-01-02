const Department = require('./department')
const Employee = require('./employee')

Department.hasMany(Employee)
Employee.belongsTo(Department)

Employee.hasMany(Employee, { as: 'subordinates', foreignKey: 'managerId' });
Employee.belongsTo(Employee, { as: 'manager', foreignKey: 'managerId' });


Department.sync({ alter: true })
Employee.sync({ alter: true })

module.exports = {
    Department, Employee
}
