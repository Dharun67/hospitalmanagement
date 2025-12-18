const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
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
    role: {
        type: String,
        required: true,
        enum: ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist', 'Ward Boy', 'Cleaning Staff', 'Watchman', 'Security Guard', 'Maintenance Worker', 'Ambulance Driver']
    },
    shift: {
        type: String,
        enum: ['Morning', 'Evening', 'Night', 'Full Day'],
        default: 'Morning'
    },
    salary: {
        type: Number,
        required: true
    },
    joiningDate: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    emergencyContact: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Leave'],
        default: 'Active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema);