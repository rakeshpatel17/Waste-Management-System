const express = require('express')
const getData = require('../controllers/profile.controller')
const router = express.Router()

router.put('/profile',getData)

module.exports = router