const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    patientId: {
        type: String,
        required: true,
        ref: 'Patient'
    },
    doctorId: {
        type: String,
        required: true,
        ref: 'Doctor'
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    fee: {
        type: Number
    },
    paymentMethod: {
        type: String
    },
    paymentStatus: {
        type: String
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);