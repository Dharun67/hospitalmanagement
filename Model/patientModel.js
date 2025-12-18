const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String
    },
    admitted: {
        type: Boolean,
        default: false
    },
    roomId: {
        type: String
    },
    visitDate: {
        type: String
    }
});

module.exports = mongoose.model('Patient', patientSchema);