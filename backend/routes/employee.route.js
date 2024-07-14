const express = require('express');
const router = express.Router();
const { signup,getAllEmployees } = require('../controllers/employee.controller');

router.post('/signup', signup);
router.get('/getAllEmployees',getAllEmployees)
module.exports = router;
