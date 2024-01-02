// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract EmployeeManagement is Ownable {

    constructor() Ownable(msg.sender) {}

    bytes32 public employeeManagerMerkleRoot;
    bytes32 public employeeDepartmentMerkleRoot;

    function setEmployeeManagerMerkleRoot(bytes32 root) external onlyOwner {
        employeeManagerMerkleRoot = root;
    }

    function setEmployeeDepartmentMerkleRoot(bytes32 root) external onlyOwner {
        employeeDepartmentMerkleRoot = root;
    }

    function isEmployeeInDepartment(uint16 employeeId, uint16 departmentId, bytes32[] memory proof) external view returns (bool) {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(employeeId, departmentId))));
        return MerkleProof.verify(proof, employeeDepartmentMerkleRoot, leaf);
    }

    function isEmployeeManagedBy(uint16 employeeId, uint16 managerId, bytes32[] memory proof) external view returns (bool) {
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(employeeId, managerId))));
        return MerkleProof.verify(proof, employeeManagerMerkleRoot, leaf);
    }
}
