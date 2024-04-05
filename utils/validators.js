// utils/validators.js

const emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Example: Minimum eight characters, at least one uppercase letter, one lowercase letter and one number

const validators = {
    /**
     * Validates an email address based on a regex pattern.
     * 
     * @param {string} email - The email address to validate.
     * @returns {boolean} True if the email is valid, otherwise false.
     */
    validateEmail: (email) => {
        return emailRegex.test(email);
    },

    /**
     * Checks the strength of a password against a regex pattern.
     * 
     * @param {string} password - The password to check.
     * @returns {boolean} True if the password meets the strength requirements, otherwise false.
     */
    validatePasswordStrength: (password) => {
        return passwordStrengthRegex.test(password);
    },

    /**
     * Validates a username to ensure it is not empty and meets any specific requirements.
     * 
     * @param {string} username - The username to validate.
     * @returns {boolean} True if the username is valid, otherwise false.
     */
    validateUsername: (username) => {
        // Example validation: non-empty with a minimum length
        return typeof username === 'string' && username.trim().length >= 3;
    }
};

module.exports = validators;
