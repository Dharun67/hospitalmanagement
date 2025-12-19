const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.models.Pharmacy || mongoose.model('Pharmacy', pharmacySchema);