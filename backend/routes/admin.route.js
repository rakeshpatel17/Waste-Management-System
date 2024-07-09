const express = require('express');
const router = express.Router();
const { getAllUsers,getAllIssues ,getAllWastes} = require('../controllers/admin.controller');
router.get('/allusers', getAllUsers);
router.get('/allissues', getAllIssues);
router.get('/allwastes', getAllWastes);
module.exports = router;