// utils/encryption.js

const bcrypt = require('bcrypt');
const saltRounds = 10; // The cost factor for processing the data

const encryption = {
    /**
     * Hashes a plaintext password.
     * 
     * @param {string} password - The plaintext password to hash.
     * @returns {Promise<string>} The hashed password.
     */
    hashPassword: async (password) => {
        try {
            const hash = await bcrypt.hash(password, saltRounds);
            return hash;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    },

    /**
     * Compares a plaintext password with a hash to verify.
     * 
     * @param {string} password - The plaintext password.
     * @param {string} hash - The hash to compare against.
     * @returns {Promise<boolean>} A promise that resolves to `true` if the password matches the hash.
     */
    verifyPassword: async (password, hash) => {
        try {
            const match = await bcrypt.compare(password, hash);
            return match;
        } catch (error) {
            console.error('Error verifying password:', error);
            throw error;
        }
    }
};

module.exports = encryption;
