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
        console.log(username);
        console.log(password);

        // Attempt to find the user by username
        const user = await User.find({ username }).limit(1);
        console.log(user); // Log the found user

        // If user is found and password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).render('login', { errorMessage: 'Incorrect username or password.' });
        } else {
            req.session.userId = user._id;
            req.session.userType = user.userType;
            return res.redirect('/');
        }
    } catch (error) {
        console.error('Login error:', error);
        // Respond with 500 Internal Server Error or a custom error message
        res.status(500).json({ errorMessage: 'Error logging in.' });
    }
};
