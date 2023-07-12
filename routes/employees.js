const router = require("express").Router();
const sql = require("mssql");
//const dbconfig = require("../dbconfig");
const User = require("../models/userModel");

/*
// Get All Employee
router.get("/get", async (req, res) => {
    const query =
        "SELECT [id],[first_name],[last_name],[join_date],[status],[manager_id] FROM [grm].[employees]";
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
});

// Create Employee
router.post("/add", async (req, res) => {
    const { firstName, lastName, joinDate, status, managerID } = req.body;
    const query = `INSERT INTO [grm].[employees]([first_name],[last_name],[join_date],[status],[manager_id]) 
                    VALUES ('${firstName}','${lastName}','${joinDate}','${status}','${managerID}')`;
    try {
        const pool = await sql.connect(dbconfig);
        const result = await pool.request().query(query);
        res.json({
            message: "Employee Created Sucessfully",
            result: result,
        });
    } catch (err) {
        res.json({
            err: err,
        });
    }
});
*/

// Testing Purposes
router.get("/test", async (req, res) => {
    const user = User.create({
        name: "John Doe 2",
        email: "john@example.com",
        age: 25,
    });

    if (user) {
        res.status(200).json({
            _id: (await user)._id,
            name: (await user).name,
            email: (await user).email,
        });
    } else {
        res.status(400);
        throw new error("Invalid user data");
    }
});

module.exports = router;
