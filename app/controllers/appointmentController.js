// controllers/appointmentController.js

const Appointment = require('../models/appointment'); // Ensure this path matches your Appointment model

// Display the appointment management page with existing slots
exports.showAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1, time: 1 });
        res.render('appointment', { appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Error fetching appointments.");
    }
};

// Handle the addition of a new appointment slot
exports.addAppointment = async (req, res) => {
    const { date, time } = req.body;
    try {
        const existingSlot = await Appointment.findOne({ date, time });
        if (existingSlot) {
            return res.status(400).send("An appointment slot for the specified date and time already exists.");
        }

        const newAppointment = new Appointment({ date, time });
        await newAppointment.save();
        res.redirect('/appointment');
    } catch (error) {
        console.error("Error adding new appointment slot:", error);
        res.status(500).send("Error adding new appointment slot.");
    }
};
