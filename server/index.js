const express = require("express");
const app = express();
const cors = require("cors");

const { PORT } = require("./config/config");
const { connectToDatabase } = require("./config/db");

const departmentRouter = require('./controllers/department')
const employeeRouter = require('./controllers/employee')
const employeeManagerMerkleRootRouter = require('./controllers/employeeManagerMerkleRoot')
const employeeDepartmentMerkleRootRouter = require('./controllers/employeeDepartmentMerkleRoot')
const employeeDepartmentTreeProofRouter = require('./controllers/employeeDepartmentTreeProof')
const employeeManagerTreeProofRouter = require('./controllers/employeeManagerTreeProof')



app.use(cors());
app.use(express.json());

app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/employeeManagerMerkleRoot', employeeManagerMerkleRootRouter)
app.use('/api/employeeDepartmentMerkleRoot', employeeDepartmentMerkleRootRouter)
app.use('/api/employeeDepartmentTreeProof', employeeDepartmentTreeProofRouter)
app.use('/api/employeeManagerTreeProof', employeeManagerTreeProofRouter)


const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
module.exports = app; 
