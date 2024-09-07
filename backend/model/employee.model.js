const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: 'available' },
    rating: {
        type: Number, // Store the average rating
        default: 0,
    },
    ratingsCount: {
        type: Number, // Store the number of ratings received
        default: 0,
    },
    sumRating: {
        type: Number, // Store the sum of all ratings received
        default: 0,
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
