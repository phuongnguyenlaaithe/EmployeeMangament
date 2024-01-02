const { expect } = require("chai");
const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const { promises  } = require("fs");
const fs = require("fs");

describe("EmployeeManagement",function () {
  let employeeManagement;
  const values = [
    ["1", "2"],
    ["3", "4"],
    ["5","4"]
  ];
  const tree = StandardMerkleTree.of(values, ["uint16", "uint16"]);
  const treeRoot = tree.root;

  beforeEach(async function () {
    const EmployeeManagement = await ethers.getContractFactory("EmployeeManagement");
    employeeManagement = await EmployeeManagement.deploy();
    await promises.writeFile("test/tree.json", JSON.stringify(tree.dump()));
  });

  it("should set merkle roots", async function () {
    await employeeManagement.setEmployeeDepartmentMerkleRoot(treeRoot);
    await employeeManagement.setEmployeeManagerMerkleRoot(treeRoot);

    expect(await employeeManagement.employeeDepartmentMerkleRoot()).to.equal(treeRoot);
    expect(await employeeManagement.employeeManagerMerkleRoot()).to.equal(treeRoot);
  });

  it("should check if an employee is in a department", async function () {

    await employeeManagement.setEmployeeDepartmentMerkleRoot(treeRoot);
    const treeData = JSON.parse(fs.readFileSync('test/tree.json', 'utf8'));
    const tree = StandardMerkleTree.load(treeData);
    const employeeId = 1;
    const departmentId = 2;
    const employeeIdString = employeeId.toString();
    const departmentIdString = departmentId.toString();

    let proof = null;

    for (const [i, v] of tree.entries()) {
      if (v[0] === employeeIdString && v[1] === departmentIdString) {
        proof = tree.getProof(i);
        console.log('Value:', v);
        console.log('Proof:', proof);
        break; 
      }
    }
    const result = await employeeManagement.isEmployeeInDepartment(employeeId, departmentId, proof);
    console.log(result);
    expect(result).to.be.true;
  });

  it("should check if an employee is managed by a manager", async function () {
    
    await employeeManagement.setEmployeeManagerMerkleRoot(treeRoot);
    const treeData = JSON.parse(fs.readFileSync('test/tree.json', 'utf8'));
    const tree = StandardMerkleTree.load(treeData);
    const employeeId = 3;
    const managerId = 4;
    const employeeIdString = employeeId.toString();
    const managerIdString = managerId.toString();

    let proof = null;

    for (const [i, v] of tree.entries()) {
      if (v[0] === employeeIdString && v[1] === managerIdString) {
        proof = tree.getProof(i);
        break; 
      }
    }
    const result = await employeeManagement.isEmployeeManagedBy(employeeId, managerId, proof);
    expect(result).to.be.true;
  });
});
