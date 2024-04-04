// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Driver', 'Examiner', 'Admin'],
        required: true
    },
    firstName: { type: String, default: 'default' },
    lastName: { type: String, default: 'default' },
    email: {
        type: String,
        required: true,
        unique: true
    },
    licenseNumber: { type: String, default: 'default' },
    age: { type: Number, default: 0 },
    carInfo: {
        make: { type: String, default: 'default' },
        model: { type: String, default: 'default' },
        year: { type: Number, default: 0 },
        plateNumber: { type: String, default: 'default' }
    }
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    if (this.isModified('licenseNumber')) {
        this.licenseNumber = await bcrypt.hash(this.licenseNumber, saltRounds);
    }
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;