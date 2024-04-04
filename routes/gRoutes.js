// routes/gRoutes.js
const express = require('express');
const router = express.Router();
const gController = require('../controllers/gController');
const { ensureAuthenticatedAndDriver } = require('../middleware/authMiddleware');


// Route to display the G page
router.get('/g', ensureAuthenticatedAndDriver, gController.showGPage);

// Route to display the G2 page
router.get('/g2', ensureAuthenticatedAndDriver, gController.showG2Page);


// Route for handling form submission from the G2 page
router.post('/submit_g2', ensureAuthenticatedAndDriver, gController.submitG2Form);

router.post('/fetchUser',ensureAuthenticatedAndDriver , async (req, res) => {
    const licenseNumber = req.body.licenseNumber;

    try {
        const user = await User.findOne({ licenseNumber });
        if (user) {
            res.render('g', { user, message: 'User information updated successfully' });
        } else {
            // Render g.ejs with an error message
            res.render('g', { user: null, errorMessage: 'No user found with the provided license plate number.' });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: 'Error fetching user data', error: error.message }); // Send JSON response with error message
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
