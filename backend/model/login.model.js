const { model } = require('mongoose')
const mongoose = require('../mongo_connect/mongo.connect')

const LoginSchema = mongoose.Schema({
    uid:String,
    username:String,
    email: String,
    password: String,
    address:String,
    phone:String
})

const loginModel = mongoose.model("Login",LoginSchema)

module.exports = loginModel