// const express = require('express');
// const router = express.Router();
// const { signup,getAllEmployees,assignEmployee,getEmployeeById } = require('../controllers/employee.controller');

// router.post('/signup', signup);
// router.get('/getAllEmployees',getAllEmployees)
// router.put('/assignEmployee/:id',assignEmployee)
// router.get('/:id',getEmployeeById)
// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  signup,
  getAllEmployees,
  assignEmployee,
  getEmployeeById,
  updateEmployeeRating, // Add this line
} = require('../controllers/employee.controller');

router.post('/signup', signup);
router.get('/getAllEmployees', getAllEmployees);
router.put('/assignEmployee/:id', assignEmployee);
router.get('/:id', getEmployeeById);
router.post('/rate/:id', updateEmployeeRating); // New route for rating

module.exports = router;
