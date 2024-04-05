// services/appointmentService.js

const Appointment = require('../models/appointmentModel');

const appointmentService = {
    // Create a new appointment
    createAppointment: async (appointmentData) => {
        try {
            const appointment = new Appointment(appointmentData);
            await appointment.save();
            return appointment;
        } catch (error) {
            // Error handling logic
            console.error('Error creating an appointment:', error);
            throw error;
        }
    },

    // Fetch all appointments
    getAllAppointments: async () => {
        try {
            const appointments = await Appointment.find();
            return appointments;
        } catch (error) {
            console.error('Error fetching appointments:', error);
            throw error;
        }
    },

    // Fetch a single appointment by ID
    getAppointmentById: async (id) => {
        try {
            const appointment = await Appointment.findById(id);
            return appointment;
        } catch (error) {
            console.error(`Error fetching appointment with ID ${id}:`, error);
            throw error;
        }
    },

    // Update an appointment by ID
    updateAppointment: async (id, updateData) => {
        try {
            const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true });
            return updatedAppointment;
        } catch (error) {
            console.error(`Error updating appointment with ID ${id}:`, error);
            throw error;
        }
    },

    // Delete an appointment by ID
    deleteAppointment: async (id) => {
        try {
            await Appointment.findByIdAndDelete(id);
            return { message: 'Appointment deleted successfully.' };
        } catch (error) {
            console.error(`Error deleting appointment with ID ${id}:`, error);
            throw error;
        }
    }
};

module.exports = appointmentService;
