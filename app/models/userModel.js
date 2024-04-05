//  app/models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true, // Indexing username for faster queries
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['Driver', 'Examiner', 'Admin'],
        required: true,
    },
    firstName: String, // Considered optional; removed default 'default'
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegex, // Validate email format
        lowercase: true, // Convert email to lowercase
        index: true, // Indexing email for faster queries
    },
    licenseNumber: String, // Considered optional; removed default 'default'
    age: Number,
    carInfo: {
        make: String,
        model: String,
        year: Number,
        plateNumber: String,
    },
});

UserSchema.pre('save', async function(next) {
    // Hash password if modified
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    // Only hash licenseNumber if it's not the default or empty
    if (this.isModified('licenseNumber') && this.licenseNumber && this.licenseNumber !== 'default') {
        this.licenseNumber = await bcrypt.hash(this.licenseNumber, saltRounds);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
