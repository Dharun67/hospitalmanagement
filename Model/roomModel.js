const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    roomNumber: {
        type: String,
        required: true,
        unique: true
    },
    bedNumber: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['ICU', 'Emergency', 'General', 'Private', 'Maternity', 'Pediatric']
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    occupied: {
        type: Boolean,
        default: false
    },
    patientId: {
        type: String,
        ref: 'Patient'
    },
    patientName: {
        type: String
    },
    admissionDate: {
        type: String
    },
    condition: {
        type: String
    },
    equipment: {
        type: String
    },
    nurseAssigned: {
        type: String
    },
    dailyRate: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Occupied', 'Maintenance'],
        default: 'Available'
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema);