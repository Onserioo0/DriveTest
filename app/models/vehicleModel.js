//  app/models/vehicleModel.js

const mongoose = require('mongoose');

// Define the schema for a vehicle
const vehicleSchema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'Vehicle make is required'], // Ensure a make is always provided
        trim: true // Removes any whitespace around the make
    },
    model: {
        type: String,
        required: [true, 'Vehicle model is required'], // Ensure a model is always provided
        trim: true
    },
    year: {
        type: Number,
        required: [true, 'Vehicle year is required'], // Ensure a year is always provided
        min: [1886, 'Vehicle year must be after the first automobile'], // 1886 is considered the birth year of the modern car
        max: [new Date().getFullYear(), 'Vehicle year cannot be in the future'] // Prevents setting a year in the future
    },
    plateNumber: {
        type: String,
        required: [true, 'License plate number is required'], // Ensure a plate number is always provided
        unique: true, // Assumes each vehicle has a unique plate number
        trim: true,
        uppercase: true // Store plate numbers in uppercase for consistency
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId, // Use ObjectId to link to a User document
        ref: 'User', // Reference the User model
        required: true
    }
});

// Optional: If you plan on frequently querying vehicles by ownerId, consider adding an index
vehicleSchema.index({ ownerId: 1 });

// Compile and export the model
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
