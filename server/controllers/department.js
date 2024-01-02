const departmentRouter = require('express').Router();
const { Department, Employee } = require('../models/associations');

// API: Get all departments
departmentRouter.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Get department by ID
departmentRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Create a new department
departmentRouter.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newDepartment = await Department.create({ name });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Update department by ID
departmentRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      await department.update({ name });
      res.json(department);
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API: Delete department by ID
departmentRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      await department.destroy();
      res.json({ message: 'Department deleted successfully' });
    } else {
      res.status(404).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = departmentRouter;
