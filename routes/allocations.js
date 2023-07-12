const router = require("express").Router();

const {
    getDetails,
    getDetailsByEmpName,
    addAllocation,
    getEmployeeAllocationByEmp,
} = require("../controllers/employeeAllocationController");

router.get("/getDetails", getDetails);

router.get("/getDetailsByEmpName/:emp_name/:week_no", getDetailsByEmpName);

router.post("/addEmployeeAllocation", addAllocation);

router.get("/getEmployeeAllocationByEmp", getEmployeeAllocationByEmp);

module.exports = router;
