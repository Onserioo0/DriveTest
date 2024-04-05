// controllers/userController.js

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
    try {
        const { username, password, repeatPassword, userType, email } = req.body;

        if (password !== repeatPassword) return res.status(400).send('Passwords do not match.');

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).send('Username already exists.');

        const newUser = new User({ username, password, userType, email });
        await newUser.save();
        console.log('The user is:', newUser);

        res.redirect('/login');
        console.log('The user is:', newUser);

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error signing up.');
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).render('login', { errorMessage: 'Incorrect username or password.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
            // Generate a token
            const token = jwt.sign(
                { userId: user._id, userType: user.userType },
                'your_secret_key', // Use an environment variable for the secret key
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            // You can send the token in a cookie or in the response body
            res.cookie('token', token, { httpOnly: true, secure: true }); // Secure: true, only in HTTPS
            return res.redirect('/');
        } else {
            return res.status(401).render('login', { errorMessage: 'Incorrect username or password.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).render('login', { errorMessage: 'An error occurred during login.' });
    }
};
