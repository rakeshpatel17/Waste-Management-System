const CollectionModel = require('../model/collection.model');
const IssueModel = require('../model/issue.model');
const multer = require('multer');
const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Ensure correct path

async function scheduleWaste(req, res) {
  const dateInMillisecs = new Date().getTime();
  const collectionId = Math.round(dateInMillisecs / 1000);
  const { uid, collectionDate, address, quantity, latitude, longitude } = req.body;
  const count = 1;
  const assignedEmpId = "";

  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
  const rating = null
  const newCollection = await CollectionModel.create({
    uid,
    collectionId,
    collectionDate,
    address,
    quantity,
    count,
    latitude,
    longitude,
    assignedEmpId,
    image: imagePath, 
    rating
  });

  res.status(200).json({ message: "Collection added successfully", collection: newCollection });
}


async function getAllCollections(req, res) {
  const allCollections = await CollectionModel.find({});
  // console.log(allCollections);
  res.status(200).send(allCollections);
}

async function getCollectionById(req, res) {
  const id = req.params.id;
  const collection = await CollectionModel.find({ uid: id });
  res.status(200).send(collection);
}

async function updateCollection(req, res) {
  const id = req.params.id;
  const { ...data } = req.body;
  const collection = await CollectionModel.findOneAndUpdate(
    { collectionId: id },
    { $set: req.body },
    { new: true }
  );
  res.status(200).send(collection);
}

async function deleteCollection(req, res) {
  const id = req.params.id;
  const collection = await CollectionModel.findOneAndDelete({ collectionId: id });
  await IssueModel.deleteMany({ collectionId: id });
  res.status(200).send(collection);
}
async function getImage(req, res) {
  console.log('hello world');
  const id = req.query.id;
  console.log("qurery id : "+id);
  // Construct the full path to the file
  const filePath = path.join(__dirname, '..', id);

  // Read the file asynchronously and send it as a response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If there's an error (e.g., file not found), send a 404 response
      return res.status(404).send('File not found');
    }

    // Send the file as a response
    res.send(data);
  });
}

async function markCollectionAsCollected(req, res) {
  const { collectionId } = req.params;
  
  try {
    const collection = await CollectionModel.findOneAndUpdate(
      { collectionId: collectionId },
      { $inc: { count: 1 } }, // increments the count by 1
      { new: true }
    );

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({ message: "Collection marked as collected", collection });
  } catch (error) {
    res.status(500).json({ message: "Error updating collection", error });
  }
}


module.exports = {
  scheduleWaste: [upload.single('image'), scheduleWaste], // Wrapped multer middleware
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getImage,
  markCollectionAsCollected
};
