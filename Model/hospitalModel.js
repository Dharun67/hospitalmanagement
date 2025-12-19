const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true    
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLength: [2, "Name must be at least 2 characters"]
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    open24x7: {
        type: Boolean,
        default: true
    }       
});

module.exports = mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);