const employeeRouter = require('express').Router();
const { Employee, Department } = require('../models/associations');

// API: Get all employees
employeeRouter.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll({ include: Department });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Get employee by ID
employeeRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id, { include: Department });
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Create a new employee
employeeRouter.post('/', async (req, res) => {
  const { name, dob, gender, phoneNumber, hometown, isManager, managerId, departmentId } = req.body;
  try {
    const newEmployee = await Employee.create({
      name,
      dob,
      gender,
      phoneNumber,
      hometown,
      isManager,
      managerId,
      departmentId
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Update employee by ID
employeeRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, dob, gender, phoneNumber, hometown, isManager, managerId, departmentId } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.update({
        name,
        dob,
        gender,
        phoneNumber,
        hometown,
        isManager,
        managerId,
        departmentId
      });
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Delete employee by ID
employeeRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.destroy();
      res.json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Get employees by Manager ID
employeeRouter.get('/byManager/:managerId', async (req, res) => {
  const { managerId } = req.params;
  try {
    const employees = await Employee.findAll({ where: { managerId } });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Get employees by Department ID
employeeRouter.get('/byDepartment/:departmentId', async (req, res) => {
  const { departmentId } = req.params;
  try {
    const employees = await Employee.findAll({ where: { departmentId } });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = employeeRouter;


