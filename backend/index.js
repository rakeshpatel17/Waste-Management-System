const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(`${process.env.URI}`).then(()=>{
    console.log("Connected to MongoDB Compass successfully...");
}).catch((err)=>{
    console.log("Something went wrong while connecting to MongoDB ");
})

const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
const loginRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const collectionRoute = require('./routes/collection.route');
const issueRoute = require('./routes/issues.route');
const adminRoute = require('./routes/admin.route');
const employeeRoute = require('./routes/employee.route');

app.use('/api/auth', loginRoute);
app.use('/api/users', profileRoute);
app.use('/api/collections', collectionRoute);
app.use('/api/issues', issueRoute);
app.use('/api/admin', adminRoute);
app.use('/api/employee', employeeRoute);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
