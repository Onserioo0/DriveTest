//  app/controllers/authController.js

const User = require('../models/userModel');

exports.showGPage = (req, res) => {
    const user = req.user;
    res.render('g', { user });
  };

  exports.showG2Page = async (req, res) => {
    const userId = req.session.userId;
    let user;
    
    try {
        user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }

        const isDefaultData = user.licenseNumber === 'default' && user.carInfo.make === 'default';
        if (isDefaultData) {
            return res.render('g2', { message: 'Please enter your information' });
        } else {
            res.render('g2', { user });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).render('g2', { message: 'Error fetching user information', error: error.message });
    }
};


exports.submitG2Form = async (req, res) => {
    // Example of handling a form submission for the G2 page
    const { firstName, lastName, licenseNumber, email, age, make, model, year, plateNumber } = req.body;
    
    console.log("Session data before update:", req.session);

    // Assume `req.session.userId` is available after successful login
    try {
        await User.findByIdAndUpdate(req.session.userId, {
            // Update user details based on form submission
            firstName,
            lastName,
            email,
            licenseNumber,
            age,
            carInfo: { make, model, year, plateNumber }
        });
        res.render('g2', { message: 'Information updated successfully!' });
    } catch (error) {
        console.error("Error updating user information:", error);
        res.render('g2', { message: 'Error updating information', error: error.message });
    }

    console.log("Session data after update:", req.session);

};
