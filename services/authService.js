// services/authService.js

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authService = {
    // Register a new user
    registerUser: async (userData) => {
        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create a new user with the hashed password
            const user = new User({
                ...userData,
                password: hashedPassword,
            });

            // Save the user to the database
            await user.save();
            return user;
        } catch (error) {
            console.error('Error registering user:', error);
            throw error; // Rethrow to handle at the calling function
        }
    },

    // Authenticate a user and return a token
    loginUser: async ({ email, password }) => {
        try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Check if the password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            // Generate a token
            const token = jwt.sign(
                { userId: user._id, userType: user.userType },
                process.env.JWT_SECRET || 'default_secret',
                { expiresIn: '1h' }
            );

            return { user, token };
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    },
};

module.exports = authService;
