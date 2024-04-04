// controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { username, password, repeatPassword, userType, email } = req.body;

        if (password !== repeatPassword) return res.status(400).send('Passwords do not match.');

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('Username already exists.');

        const newUser = new User({ username, password, userType, email });
        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error signing up.');
    }
};

exports.login = async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Attempt to find the user by username
        const user = await User.findOne({ username: username });

        // If user is found and password matches
        if (user && await bcrypt.compare(password, user.password)) {
            // Here, you can set up your session or token
            req.session.userId = user._id; // Example for session-based auth
            req.session.userType = user.userType; // Storing additional user info in session
            // Redirect or respond as necessary, e.g., with a success message or redirect URL
            res.json({ message: "Login successful", redirectUrl: "/" }); // Adjust as needed
        } else {
            // Respond with 401 Unauthorized if user not found or password mismatch
            return res.status(401).json({ error: 'Login failed: Unauthorized' });
        }
    } catch (error) {
        console.error('Login error:', error);
        // Respond with 500 Internal Server Error or a custom error message
        res.status(500).json({ errorMessage: 'Error logging in.' });
    }
};
