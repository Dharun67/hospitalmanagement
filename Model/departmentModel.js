const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
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
    head: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    patientCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Department', departmentSchema);