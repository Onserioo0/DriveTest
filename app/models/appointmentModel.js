//  app/models/appointmentModel.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    dateTime: { 
        type: Date, 
        required: [true, 'Date and time are required'], 
        validate: [dateValidator, 'Appointment date must be in the future.']
    },
    isTimeSlotAvailable: { type: Boolean, default: true }
});

// Adds an ascending index on dateTime for faster querying
appointmentSchema.index({ dateTime: 1 });

// Validator function to ensure appointment date is in the future
function dateValidator(value) {
    // You might adjust the logic here to account for timezones or other considerations
    return value.getTime() > Date.now();
}

module.exports = mongoose.model('Appointment', appointmentSchema);
