// config/db.js

const mongoose = require('mongoose');
require('dotenv').config();

// Construct the database URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDatabaseName';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

// Function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, options);
        console.log('Successfully connected to the MongoDB database.');
    } catch (error) {
        console.error('Database connection failed. Exiting now...', error);
        process.exit(1);
    }
};

module.exports = connectDB;
