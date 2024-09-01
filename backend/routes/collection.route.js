const express=require('express')
const router=express.Router()
const {scheduleWaste,getAllCollections,getCollectionById,updateCollection,deleteCollection,getImage}=require('../controllers/collection.controller')
router.post('/',scheduleWaste)
router.get('/image',getImage)
router.get('/',getAllCollections)
router.get('/:id',getCollectionById)
router.put('/:id',updateCollection)
router.delete('/:id',deleteCollection)

module.exports= router