// services/userService.js

const User = require('../models/userModel');

const userService = {
    // Fetch all users
    getAllUsers: async () => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            console.error('Failed to retrieve users:', error);
            throw error;
        }
    },

    // Fetch a single user by ID
    getUserById: async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            console.error(`Failed to find user with ID ${userId}:`, error);
            throw error;
        }
    },

    // Create a new user
    createUser: async (userData) => {
        try {
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Update user details
    updateUser: async (userId, updateData) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        } catch (error) {
            console.error(`Error updating user with ID ${userId}:`, error);
            throw error;
        }
    },

    // Delete a user
    deleteUser: async (userId) => {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            return { message: 'User successfully deleted', userId: userId };
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            throw error;
        }
    }
};

module.exports = userService;
