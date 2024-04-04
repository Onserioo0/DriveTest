// controllers/userController.js
const User = require('../models/user'); // Ensure this path is correct
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.signup = async (req, res) => {
    const { username, password, repeatPassword, userType, email } = req.body;

    // Validate input fields
    if (!username || !email || !password || !repeatPassword || !userType) {
        return res.status(400).send('Please fill in all fields');
    }

    if (password !== repeatPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            userType,
            firstName: 'default',
            lastName: 'default',
            licenseNumber: 'default',
            age: 0,
            carInfo: {
                make: 'default',
                model: 'default',
                year: 0,
                plateNumber: 'default',
            },
        });

        await newUser.save();

        res.redirect('/login');
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error signing up.');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!User || !isValidPassword) {
        return res.render('login', { error: 'Invalid username or password. Please sign up first.' });
      }
      
    if (User && isValidPassword) {
        req.session.userId = User._id;
        req.session.isAuthenticated = true;
        res.redirect('/g2');
      }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Incorrect username or password.');
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // Assuming you're using express-session
            req.session.userId = user._id; // Save user ID in session
            req.session.userType = user.userType; // Save userType in session for authorization checks
            res.redirect('/'); // Redirect to home or another page
        } else {
            res.status(401).send('Incorrect username or password.');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in.');
    }
};
