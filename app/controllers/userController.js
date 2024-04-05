//  app/controllers/userController.js

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Specify the number of salt rounds for bcrypt
const saltRounds = 10;

exports.signup = async (req, res) => {
    try {
        const { username, password, repeatPassword, userType, email } = req.body;

        // Validate passwords match
        if (password !== repeatPassword) {
            return res.status(400).send('Passwords do not match.');
        }

        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists.');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            username,
            password: hashedPassword, // Store hashed password
            userType,
            email
        });

        await newUser.save();
        console.log('User created:', newUser);

        // Automatically log in the user after signup and redirect to the home page
        const token = jwt.sign(
            { userId: newUser._id, userType: newUser.userType },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: true });
        res.redirect('/'); // Redirect to the home page or dashboard
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error signing up.');
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Generic error message for security
        const errorMessage = 'Incorrect username or password.';

        if (!user) {
            return res.status(401).render('login', { errorMessage });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Generate a token
            const token = jwt.sign(
                { userId: user._id, userType: user.userType },
                process.env.JWT_SECRET_KEY, // Securely stored secret key
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { httpOnly: true, secure: true });
            return res.redirect('/'); // Redirect to home page or dashboard
        } else {
            return res.status(401).render('login', { errorMessage });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { errorMessage: 'An error occurred during login.' });
    }
};
