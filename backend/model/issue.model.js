const mongoose = require("mongoose")
const IssueSchema = mongoose.Schema({
    uid:String,
    issueId:String,
    issueType:String,
    issueDescription:String,
    status:String,
    collectionId:String
})

const issueModel = mongoose.model("Issues",IssueSchema)

module.exports = issueModel

