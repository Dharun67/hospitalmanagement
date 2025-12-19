const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
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
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true
    },
    timing: {
        type: String
    }
});

module.exports = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);