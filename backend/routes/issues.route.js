const express=require('express')
const {reportIssue,getAllIssues,getIssueById,updateIssueById,deleteIssueById,getIssuebyCollectionIn}=require("../controllers/issues.controller")
const router=express.Router()
router.use(express.json())

router.post('/',reportIssue)
router.get('/',getAllIssues)
router.get('/:id',getIssueById)
router.put('/:id',updateIssueById)
router.delete('/:id',deleteIssueById)
router.get("/:cid",getIssuebyCollectionIn)


module.exports=router 