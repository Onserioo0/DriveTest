// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const userSchema = new mongoose.Schema({
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

// Password hashing middleware before saving a new user
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    } else {
        next();
    }

    // Only encrypt if licenseNumber is modified or new
    if (this.isModified('licenseNumber') || this.isNew) {
        bcrypt.hash(this.licenseNumber, saltRounds, (err, hash) => {
            if (err) return next(err);
            this.licenseNumber = hash;
            next();
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;