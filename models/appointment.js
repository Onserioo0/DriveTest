const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    date: String,
    time: String,
    isTimeSlotAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
