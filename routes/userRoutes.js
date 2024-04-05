// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for handling user signup
router.post('/signup', userController.signup);

// Route for handling user login
router.post('/login', userController.login);

// Route for handling user logout
router.get('/logout', (req, res) => {
    // Check if the session exists before attempting to destroy it
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                // Log the error and redirect to a safe place like the user dashboard or home page
                console.error('Failed to destroy the session during logout', err);
                return res.redirect('/dashboard');
            }
            // Clear the cookie associated with the session if desired
            // res.clearCookie('session cookie name');

            // Redirect to login page after successful logout
            res.redirect('/login');
        });
    } else {
        // If no session exists, just redirect to login page
        res.redirect('/login');
    }
});

module.exports = router;
