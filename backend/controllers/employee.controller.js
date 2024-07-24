const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const employeeModel = require('../model/employee.model');

async function signup(req, res) {
    const { username, email, password } = req.body;
    try {
        const existingUser = await employeeModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: `User with email ${email} already has an account. Please sign in.` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await employeeModel.create({ username, email, password: hashedPassword });

        const payload = { id: newUser.id };
        jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
                console.error("Error creating token:", err);
                return res.status(500).json({ message: "Token creation failed", error: err.message });
            }
            return res.status(200).json({ token, userData: newUser });
        });
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ message: "Error occurred while signing up", error: err.message });
    }
}

async function getAllEmployees(req,res){
    const employees = await employeeModel.find({});
    console.log(employees)
    res.status(200).json({data:employees});
}
module.exports = {signup,getAllEmployees };
