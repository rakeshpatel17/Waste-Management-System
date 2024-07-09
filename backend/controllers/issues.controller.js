const issueModel=require('../model/issue.model')
async function reportIssue(req,res){
    const {uid,collectionId,issueType,issueDescription}=req.body
    const dateInMillisecs = new Date().getTime();
    const issueId = Math.round(dateInMillisecs / 1000);
    const newIssue=await issueModel.create({
       uid,issueId,issueType,issueDescription,status:"Pending",collectionId
    
    })
    res.send(newIssue)
}
async function scheduleWaste(req,res){
    //console.log(req.body);
    const dateInMillisecs = new Date().getTime();
    const collectionId = Math.round(dateInMillisecs / 1000);
    const {uid,collectionDate, address, notes}=req.body
    const newCollection = await CollectionModel.create({uid,collectionId,collectionDate, address, notes})
    //console.log(newCollection);
    res.status(200).json({message:"collection added successfully"});
}
async function getAllIssues(req,res){
    const issueData=await issueModel.find({})
    res.send(issueData)
}
async function getIssueById(req,res){
    const id=req.params.id
    const issueData=await issueModel.find({uid:id})
    res.send(issueData)
}

async function getIssuebyCollectionIn(req,res){
    console.log("Came.......!!!!!!!!!!!!!!!!!");
    const id=req.params.cid
    console.log(id);
    const issueData=await issueModel.find({collectionId:id})
    res.send(issueData)
}


async function updateIssueById(req,res){
    const id=req.params.id
    console.log("request body",req.body);
    const {uid,issueType,issueDescription,status}=req.body
    const issueData=await issueModel.updateMany({issueId:id},{$set:{
            "uid":uid,
            "issueType":issueType,
            "issueDescription":issueDescription,
            "status":status
        }
    })
        const updatedData=await issueModel.find({uid:uid})
        console.log("updated",updatedData);
        res.send(updatedData)
}
async function deleteIssueById(req,res){
    const id=req.params.id
    console.log(id);
    await issueModel.findOneAndDelete({issueId:id})
    res.send("Data successfully deleted")
}

module.exports={reportIssue,getAllIssues,getIssueById,updateIssueById,deleteIssueById,getIssuebyCollectionIn}