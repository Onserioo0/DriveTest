// tests/appointmentModelTest.js

const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect;

// Assuming you have a model like this
const Appointment = require('../models/appointmentModel');

describe('Appointment Model Tests', function() {
    // Setup and teardown hooks
    before(async function() {
        // Connect to a test database
        await mongoose.connect('mongodb://localhost:27017/testDatabase', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    after(async function() {
        // Cleanup: drop test database and close connection
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async function() {
        // Before each test, ensure the collection is empty
        await Appointment.deleteMany({});
    });

    // Test cases
    it('should create a new appointment successfully', async function() {
        const appointmentData = {
            date: new Date(),
            time: '14:00',
            isTimeSlotAvailable: true
        };

        const appointment = new Appointment(appointmentData);
        const savedAppointment = await appointment.save();

        // Assertions
        expect(savedAppointment._id).to.exist;
        expect(savedAppointment.date).to.equal(appointmentData.date);
        expect(savedAppointment.time).to.equal(appointmentData.time);
        expect(savedAppointment.isTimeSlotAvailable).to.equal(appointmentData.isTimeSlotAvailable);
    });

    it('should not create an appointment without a date', async function() {
        const appointmentData = {
            time: '15:00',
            isTimeSlotAvailable: true
        };

        const appointment = new Appointment(appointmentData);
        
        // Using Chai as Promised for cleaner async assertions
        await expect(appointment.save()).to.be.rejectedWith(mongoose.Error.ValidationError);
    });

    // Add more tests as needed for your model validation, methods, and statics
});

