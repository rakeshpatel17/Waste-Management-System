const express = require('express');
const router = express.Router();
const { signup,getAllEmployees,assignEmployee } = require('../controllers/employee.controller');

router.post('/signup', signup);
router.get('/getAllEmployees',getAllEmployees)
router.put('/assignEmployee/:id',assignEmployee)
module.exports = router;
