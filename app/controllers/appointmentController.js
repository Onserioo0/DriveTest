// app/controllers/appointmentController.js

const Appointment = require('../models/appointmentModel');

// Display the appointment management page with existing slots
exports.showAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1, time: 1 });
        res.render('appointment', { appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ error: "Error fetching appointments." });
    }
};

exports.showAppointmentBookingForm = (req, res) => {
    try {
        // Render the booking form view
        res.render('bookAppointment'); // Ensure you have a view file named 'bookAppointment.ejs'
    } catch (error) {
        console.error("Error displaying the booking form:", error);
        res.status(500).json({ error: "Error displaying the booking form." });
    }
};

exports.handleAppointmentBooking = async (req, res) => {
    const { date, time } = req.body;

    // Validate the date and time format
    if (!isValidDate(date) || !isValidTime(time)) {
        return res.status(400).json({ error: "Invalid date or time format." });
    }

    try {
        // Check if the appointment slot is already taken
        const existingSlot = await Appointment.findOne({ date, time });
        if (existingSlot) {
            // Consider rendering the form again with an error message
            return res.status(409).json({ error: "An appointment slot for the specified date and time already exists." }); // 409 Conflict
        }

        // Create and save the new appointment
        const newAppointment = new Appointment({ date, time });
        await newAppointment.save();
        res.status(201).redirect('/appointments'); // 201 Created
    } catch (error) {
        console.error("Error booking new appointment:", error);
        res.status(500).json({ error: "Error booking new appointment. Please try again." });
    }
};

// Display the appointments dashboard
exports.displayAppointmentsDashboard = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.render('dashboard', { appointments });
    } catch (error) {
        console.error("Error displaying appointments dashboard:", error);
        res.status(500).json({ error: "Error displaying appointments dashboard." });
    }
};

// Handle the creation of a new appointment
exports.addAppointment = async (req, res) => {
    const { date, time } = req.body;

    // Validate the date and time format
    if (!isValidDate(date) || !isValidTime(time)) {
        return res.status(400).json({ error: "Invalid date or time format." });
    }

    try {
        // Check if the appointment slot is already taken
        const existingSlot = await Appointment.findOne({ date, time });
        if (existingSlot) {
            return res.status(409).json({ error: "An appointment slot for the specified date and time already exists." }); // 409 Conflict
        }

        // Create and save the new appointment
        const newAppointment = new Appointment({ date, time });
        await newAppointment.save();
        res.status(201).redirect('/appointments'); // 201 Created
    } catch (error) {
        console.error("Error adding new appointment slot:", error);
        res.status(500).json({ error: "Error adding new appointment slot. Please try again." });
    }
};

// Helper function to validate the date format
function isValidDate(dateString) {
    // Implement your own date validation logic here
    // Return true if the date is valid, false otherwise
    // For example:
    // return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    return true;
}

// Helper function to validate the time format
function isValidTime(timeString) {
    // Implement your own time validation logic here
    // Return true if the time is valid, false otherwise
    // For example:
    // return /^\d{2}:\d{2}$/.test(timeString);
    return true;
}