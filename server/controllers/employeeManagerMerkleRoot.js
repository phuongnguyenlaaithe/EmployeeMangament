const employeeManagerMerkleRootRouter = require('express').Router();
const { Employee, Department } = require('../models/associations');
const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');
const { promises  } = require("fs");

// API: Generate employeeManagerMerkleRoot
employeeManagerMerkleRootRouter.get('/', async (req, res) => {
    try {
      // Fetch all employees with their managers
      const employeesWithManagers = await Employee.findAll({
        include: [
          {
            model: Employee,
            as: 'manager',
          },
        ],
      });
  
      // Extract relevant data for Merkle Tree construction
      const merkleData = employeesWithManagers.map((employee) => ({
        employeeId: employee.id,
        managerId: employee.manager ? employee.manager.id : null,
      }));
  
      // Convert data to values array for the Merkle Tree
      const values = merkleData.map((data) => [
        data.employeeId.toString(),
        data.managerId ? data.managerId.toString() : '0',
      ]);
  
      // Create Merkle Tree
      const tree = StandardMerkleTree.of(values, ["uint16", "uint16"]);
  
      // Get Merkle Root
      const merkleRoot = tree.root.toString('hex');
  
      await promises.writeFile("tree/employeeManagerTree.json", JSON.stringify(tree.dump()));

      res.json({ merkleRoot });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = employeeManagerMerkleRootRouter;
