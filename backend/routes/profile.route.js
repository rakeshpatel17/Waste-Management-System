const express = require('express')
const {getData,getUserDetails,getAllUsers} = require('../controllers/profile.controller')
const router = express.Router()

router.put('/profile',getData)
router.get("/:id",getUserDetails)
router.get("/",getAllUsers)
module.exports = router