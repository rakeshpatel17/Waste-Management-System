const CollectionModel = require('../model/collection.model');
const IssueModel = require('../model/issue.model');
const multer = require('multer');
const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();
// Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });
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

  // Store the relative path of the uploaded file
  const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

  // Create new collection with relative image path
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
    image: imagePath, // Store relative path
  });

  res.status(200).json({ message: "Collection added successfully", collection: newCollection });
}


async function getAllCollections(req, res) {
  const allCollections = await CollectionModel.find({});
  console.log(allCollections);
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
module.exports = {
  scheduleWaste: [upload.single('image'), scheduleWaste], // Wrapped multer middleware
  getAllCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
  getImage
};
