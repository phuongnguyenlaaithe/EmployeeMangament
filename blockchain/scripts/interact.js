require("dotenv").config();
const { ethers } = require('ethers');
const axios = require("axios");

const contractAddress = process.env.CONTRACT_ADDRESS; 
const contractABI = require("../artifacts/contracts/EmployeeManagement.sol/EmployeeManagement.json").abi;
const privateKey = process.env.PRIVATE_KEY; 
const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
const wallet = new ethers.Wallet(privateKey, provider);

const employeeManagement = new ethers.Contract(contractAddress, contractABI, wallet);

async function getEmployeeManagerMerkleRoot() {
  try {
    const merkleRoot = await employeeManagement.employeeManagerMerkleRoot();
    console.log('Employee Manager Merkle Root:', merkleRoot);
    return merkleRoot;
  } catch (error) {
    console.error('Error getting employeeManagerMerkleRoot:', error.message);
  }
}

async function getEmployeeDepartmentMerkleRoot() {
  try {
    const merkleRoot = await employeeManagement.employeeDepartmentMerkleRoot();
    console.log('Employee Department Merkle Root:', merkleRoot);
    return merkleRoot;
  } catch (error) {
    console.error('Error getting employeeDepartmentMerkleRoot:', error.message);
  }
}

async function setEmployeeManagerMerkleRoot() {
  try {
    const response = await axios.get(`http://localhost:3001/api/employeeManagerMerkleRoot`);
    const merkleRootManager = response.data.merkleRoot
    const transaction = await employeeManagement.setEmployeeManagerMerkleRoot(merkleRootManager, { gasPrice: ethers.utils.parseUnits('50', 'gwei')});
    const receipt = await transaction.wait();
    console.log('Transaction successful:', receipt.transactionHash);
  } catch (error) {
    console.error('Error setting employeeManagerMerkleRoot:', error.message);
  }
}

async function setEmployeeDepartmentMerkleRoot() {
  try {
    const response = await axios.get(`http://localhost:3001/api/employeeDepartmentMerkleRoot`);
    const merkleRootDepartment = response.data.merkleRoot
    const transaction = await employeeManagement.setEmployeeDepartmentMerkleRoot(merkleRootDepartment, { gasPrice: ethers.utils.parseUnits('50', 'gwei')});
    const receipt = await transaction.wait();
    console.log('Transaction successful:', receipt.transactionHash);
  } catch (error) {
    console.error('Error setting employeeDepartmentMerkleRoot:', error.message);
  }
}

async function isEmployeeInDepartment(employeeId, departmentId) {
  try {
    const response = await axios.get(`http://localhost:3001/api/employeeDepartmentTreeProof?employeeId=${employeeId}&departmentId=${departmentId}`);
    const proof = response.data.proof;
    
    if (proof === null) {
      console.log('Employee is not in the department.');
      return;
    }

    if (await employeeManagement.isEmployeeInDepartment(employeeId, departmentId, proof)) {
      console.log('Employee is in the department.');
    } else {
      console.log('Employee is not in the department.');
    }
  } catch (error) {
    console.error('Error checking isEmployeeInDepartment:', error.message);
  }
}

async function isEmployeeManagedBy(employeeId, managerId) {
  try {
    const response = await axios.get(`http://localhost:3001/api/employeeManagerTreeProof?employeeId=${employeeId}&managerId=${managerId}`);
    const proof = response.data.proof;

    if (proof === null) {
      console.log('Employee is not managed by the manager.');
      return;
    }
    if (await employeeManagement.isEmployeeManagedBy(employeeId, managerId, proof)) {
      console.log('Employee is managed by the manager.');
    } else {
      console.log('Employee is not managed by the manager.');
    }
  } catch (error) {
    console.error('Error checking isEmployeeManagedBy:', error.message);
  }
}

// setEmployeeManagerMerkleRoot();
// setEmployeeDepartmentMerkleRoot();
// getEmployeeManagerMerkleRoot();
// getEmployeeDepartmentMerkleRoot();
// const employeeIdToCheck = 11;
// const departmentIdToCheck = 3;
// const managerIdToCheck = 7;
// isEmployeeInDepartment(employeeIdToCheck, departmentIdToCheck);
// isEmployeeManagedBy(employeeIdToCheck, managerIdToCheck);
