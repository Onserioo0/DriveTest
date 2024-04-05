// app/controllers/appointmentController.js

const Appointment = require('../models/appointmentModel'); // Ensure this path matches your Appointment model

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

exports.addAppointment = async (req, res) => {
    const { date, time } = req.body;

    // Example validation (pseudo-code)
    if (!isValidDate(date) || !isValidTime(time)) {
        return res.status(400).send("Invalid date or time format.");
    }

    try {
        const existingSlot = await Appointment.findOne({ date, time });
        if (existingSlot) {
            return res.status(409).send("An appointment slot for the specified date and time already exists."); // 409 Conflict
        }

        const newAppointment = new Appointment({ date, time });
        await newAppointment.save();
        res.status(201).redirect('/appointment'); // 201 Created
    } catch (error) {
        console.error("Error adding new appointment slot:", error);
        res.status(500).send("Error adding new appointment slot. Please try again.");
    }
};

