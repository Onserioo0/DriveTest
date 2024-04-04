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
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).render('login', { errorMessage: 'Incorrect username or password.' });
        }

        req.session.userId = user._id;
        req.session.userType = user.userType;
        res.json({ message: "Login successful", redirectUrl: "/g2" });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in.');
    }
};
