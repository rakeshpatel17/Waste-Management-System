const mongoose = require("mongoose")
const CollectionSchema = mongoose.Schema({
    uid:String,
    collectionId:String,
    collectionDate: String,
    address:String,
    quantity: Number,
    count: { type: Number, default: 1 },
    latitude:  Number,
    longitude:  Number,
    assignedEmpId:String,
    image: String,
    rating:Number
})

const CollectionModel = mongoose.model("Collection", CollectionSchema)
module.exports = CollectionModel