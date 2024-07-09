const express = require('express');
const loginRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route')
const mongoose = require('./mongo_connect/mongo.connect');
const collectionRoute=require('./routes/collection.route')
const issueRoute=require("./routes/issues.route")
const adminRoute=require("./routes/admin.route")
require('dotenv').config();
const cors = require('cors');



const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use('/api/auth', loginRoute);
app.use('/api/users',profileRoute);
app.use('/api/collections',collectionRoute);
app.use('/api/issues',issueRoute);
app.use('/api/admin',adminRoute)
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT} successfully`);
});
