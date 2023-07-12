const EmployeeAllocation = require("../models/employeeAllocationModel");
const Allocation = require("../models/allocationModel");

// Get All The Allocations Details
module.exports.getDetails = async (req, res) => {
    const employeeAllocation = await EmployeeAllocation.find().populate(
        "allocation_details"
    );

    if (employeeAllocation) {
        res.status(200).json({
            result: employeeAllocation,
        });
    }
};

// Get All the Allocation Details By Employee Name & Week No
module.exports.getDetailsByEmpName = async (req, res) => {
    const { emp_name, week_no } = req.params;
    const employeeAllocation = await EmployeeAllocation.find({
        emp_name: emp_name,
        week_no: week_no,
    }).populate("allocation_details");

    if (employeeAllocation) {
        res.status(200).json({
            result: employeeAllocation,
        });
    } else {
        res.status(404).json({
            message: "Not Found!!!",
        });
    }
};

// Add Allocation
module.exports.addAllocation = async (req, res) => {
    try {
        const {
            emp_name,
            cm_group,
            week_no,
            week_start_date,
            customer,
            role,
            allocation,
        } = req.body;

        const allocation_ = await Allocation.create({
            customer: customer,
            role: role,
            allocation: allocation,
            week_no: week_no,
        });

        let employeeAllocation = await EmployeeAllocation.findOne({
            emp_name: emp_name,
            week_no: week_no,
        }).populate("allocation_details");

        if (!employeeAllocation) {
            employeeAllocation = await EmployeeAllocation.create({
                emp_name: emp_name,
                cm_group: cm_group,
                week_no: week_no,
                week_start_date: week_start_date,
                allocation_details: [allocation_._id],
            });
            res.status(201).json({
                message: "Created Employee Allocation",
                _id: employeeAllocation._id,
            });
        } else {
            employeeAllocation.allocation_details.push(allocation_);
            await employeeAllocation.save();
            res.status(201).json({
                message: "Updated Employee Allocation",
                _id: employeeAllocation._id,
            });
        }
    } catch (error) {
        console.error("Failed to add/update employee allocation:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports.getEmployeeAllocationByEmp = async (req, res) => {
    try {
        const employeeDetails = await EmployeeAllocation.aggregate([
            {
                $lookup: {
                    from: "allocations",
                    localField: "allocation_details",
                    foreignField: "_id",
                    as: "allocation_details",
                },
            },
            {
                $group: {
                    _id: "$emp_name",
                    emp_name: { $first: "$emp_name" },
                    cm_group: { $first: "$cm_group" },
                    details: {
                        $push: {
                            week_no: "$week_no",
                            week_start_date: "$week_start_date",
                            leave: "$leave",
                            public_holiday: "$public_holiday",
                            vacation: "$vacation",
                            sum: { $sum: "$allocation_details.allocation" },
                            available: {
                                $subtract: [
                                    100,
                                    { $sum: "$allocation_details.allocation" },
                                ],
                            },
                            allocation_details: "$allocation_details",
                        },
                    },
                },
            },
        ]);
        res.json({ message: "Sucessfull", result: employeeDetails });
    } catch (error) {
        console.error("Failed to retrieve employee details:", error);
    }
};
