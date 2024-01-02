const employeeDepartmentMerkleRootRouter = require("express").Router();
const { Employee, Department } = require("../models/associations");
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const { promises  } = require("fs");

// API: Generate employeeDepartmentMerkleRoot
employeeDepartmentMerkleRootRouter.get("/", async (req, res) => {
  try {
    // Fetch all employees with their departments
    const employeesWithDepartments = await Employee.findAll({
      include: [
        {
          model: Department,
        },
      ],
    });

    // Extract relevant data for Merkle Tree construction
    const merkleData = employeesWithDepartments.map((employee) => ({
      employeeId: employee.id,
      departmentId: employee.department ? employee.department.id : null,
    }));

    // Convert data to values array for the Merkle Tree
    const values = merkleData.map((data) => [
      data.employeeId.toString(),
      data.departmentId ? data.departmentId.toString() : "0",
    ]);

    // Create Merkle Tree
    const tree = StandardMerkleTree.of(values, ["uint16", "uint16"]);

    // Get Merkle Root
    const merkleRoot = tree.root.toString("hex");

    await promises.writeFile("tree/employeeDepartmentTree.json", JSON.stringify(tree.dump()));

    res.json({ merkleRoot });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = employeeDepartmentMerkleRootRouter;
