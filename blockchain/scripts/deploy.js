const { ethers } = require("hardhat");
const axios = require("axios");

async function main() {
  // Deploy or retrieve the contract instance
  const EmployeeManagement = await ethers.getContractFactory("EmployeeManagement");
  const employeeManagement = await EmployeeManagement.deploy();
  console.log(
    `deployed to ${employeeManagement.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
