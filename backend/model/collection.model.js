const { model } = require('mongoose')
const mongoose = require('../mongo_connect/mongo.connect')

const CollectionSchema = mongoose.Schema({
    uid:String,
    collectionId:String,
    collectionDate: String,
    address: String,
    notes: String,
    count: { type: Number, default: 1 },
    latitude:  Number,
    longitude:  Number
})

const CollectionModel = mongoose.model("Collection", CollectionSchema)
module.exports = CollectionModel