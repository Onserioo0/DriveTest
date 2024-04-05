// routes/appointmentRoutes.js

const express = require('express');
const router = express.Router();

const { ensureAuthenticated, ensureAuthenticatedAndDriver } = require('../middleware/authMiddleware');
const AppointmentController = require('../app/controllers/appointmentController');

// Middleware to check if user is authenticated and is a Driver
router.use(ensureAuthenticated);
router.use(ensureAuthenticatedAndDriver);

// Route to display appointments dashboard or booking page for Drivers
router.get('/dashboard', AppointmentController.displayAppointmentsDashboard);

// Route to display form for booking a new appointment
router.get('/book', AppointmentController.showAppointmentBookingForm);

// Route to handle the submission of the booking form
router.post('/book', AppointmentController.handleAppointmentBooking);

module.exports = router;

