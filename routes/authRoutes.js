// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const { ensureAuthenticatedAndDriver } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    if (req.session.userId) {
        res.redirect('/dashboard'); // Redirect authenticated users to the dashboard
    } else {
        res.redirect('/login'); // Redirect unauthenticated users to the login page
    }
});

// Route to display the G page
router.get('/g', ensureAuthenticatedAndDriver, authController.showGPage);

// Route to display the G2 page
router.get('/g2', ensureAuthenticatedAndDriver, authController.showG2Page);


// Route for handling form submission from the G2 page
router.post('/submit_g2', ensureAuthenticatedAndDriver, authController.submitG2Form);

// Improved error handling and response consistency
router.post('/fetchUser', ensureAuthenticatedAndDriver, async (req, res) => {
    const licenseNumber = req.body.licenseNumber.trim();

    if (!licenseNumber) {
        // Validate license number input
        return res.render('g', { errorMessage: 'Please provide a valid license number.' });
    }

    try {
        const user = await User.findOne({ licenseNumber });
        if (user) {
            res.render('g', { user, message: 'User information found.' });
        } else {
            res.render('g', { errorMessage: 'No user found with the provided license number.' });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.render('error', { message: 'Error fetching user data' }); // Consider using a generic error view
    }
});


router.post('/updateUser', ensureAuthenticatedAndDriver, async (req, res) => {
    const { licenseNumber, make, model, year, plateNumber } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { licenseNumber },
            {
                $set: {
                    'carInfo.make': make,
                    'carInfo.model': model,
                    'carInfo.year': year,
                    'carInfo.plateNumber': plateNumber
                }
            },
            { new: true }
        );

        if (!user) {
            return res.render('g', { message: 'No User Found', licenseNumber, user: null });
        }

        return res.render('g', { user, message: 'Car information updated successfully', licenseNumber });
    } catch (error) {
        console.error("Error updating car information:", error);
        return res.status(500).send('Error updating car information');
    }
});

module.exports = router;
