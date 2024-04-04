// controllers/gController.js

const User = require('../models/user'); // Adjust the path as per your project structure

exports.showGPage = (req, res) => {
    const user = req.user;
    res.render('g', { user });
  };

exports.showG2Page = async (req, res) => {
    const userId = req.session.userId;
    try {
        const user = await User.findById(userId);
        res.render('g2', { user });
      } catch (error) {
        console.error("Error:", error);
      }
    const isDefaultData = user.licenseNumber === 'default' && user.carInfo.make === 'default';
  
    if (isDefaultData) {
      return res.render('g2', { message: 'Please enter your information' });
    }
  
    // If user data is not default, render the G2 page with the existing data
    res.render('g2', { user });
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
