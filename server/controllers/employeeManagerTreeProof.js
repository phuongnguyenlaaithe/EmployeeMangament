const employeeManagerTreeProofRouter = require('express').Router();
const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');
const fs = require("fs"); // Import fs module separately

// API: Lấy proof từ Merkle Tree dựa trên hai ID
employeeManagerTreeProofRouter.get('/', (req, res) => {
  try {
    // (1) Đọc dữ liệu Merkle Tree từ tệp tree.json
    const treeData = JSON.parse(fs.readFileSync('tree/employeeManagerTree.json', 'utf8'));
    const tree = StandardMerkleTree.load(treeData);
    
    // (2) Nhận hai ID từ tham số query của request
    const { employeeId, managerId } = req.query;

    // (3) Chuyển đổi ID sang chuỗi
    const employeeIdString = employeeId.toString();
    const managerIdString = managerId.toString();

    let proof = null;

    for (const [i, v] of tree.entries()) {
      if (v[0] === employeeIdString && v[1] === managerIdString) {
        proof = tree.getProof(i);
        console.log('Value:', v);
        console.log('Proof:', proof);
        break; // Stop the loop once a match is found
      }
    }

    res.json({ proof });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = employeeManagerTreeProofRouter;
