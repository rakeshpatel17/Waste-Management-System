const express = require('express');
const router = express.Router();
const { signup,getAllEmployees,assignEmployee,getEmployeeById } = require('../controllers/employee.controller');

router.post('/signup', signup);
router.get('/getAllEmployees',getAllEmployees)
router.put('/assignEmployee/:id',assignEmployee)
router.get('/:id',getEmployeeById)
module.exports = router;
