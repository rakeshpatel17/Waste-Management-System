const { model } = require('mongoose')
const mongoose = require('../mongo_connect/mongo.connect')

const CollectionSchema = mongoose.Schema({
    uid:String,
    collectionId:String,
    collectionDate: String,
    quantity: Number,
    count: { type: Number, default: 1 }
})

const CollectionModel = mongoose.model("Collection", CollectionSchema)
module.exports = CollectionModel