const Doctor = require('../Model/doctorModel');

// Generate unique doctor ID
const generateDoctorId = async () => {
    const lastDoctor = await Doctor.findOne().sort({ id: -1 });
    if (!lastDoctor) return 'DOC101';
    const lastNum = parseInt(lastDoctor.id.replace('DOC', ''));
    return `DOC${lastNum + 1}`;
};

// GET all doctors data
exports.getAllDoctorsData = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({
            status: "success",
            count: doctors.length,
            data: doctors
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// GET doctor by specialization
exports.getDoctorsBySpecialization = async (req, res) => {
    try {
        const { specialization } = req.params;
        const doctors = await Doctor.find({ 
            specialization: new RegExp(specialization, 'i') 
        });
        
        res.status(200).json({
            status: "success",
            specialization: specialization,
            count: doctors.length,
            data: doctors
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// CREATE doctor
exports.createDoctor = async (req, res) => {
    try {
        const doctorId = await generateDoctorId();
        const newDoctor = await Doctor.create({
            ...req.body,
            id: doctorId
        });
        res.status(201).json({
            status: "success",
            data: newDoctor
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// UPDATE doctor
exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedDoctor) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: updatedDoctor
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        
        if (!deletedDoctor) {
            return res.status(404).json({
                status: "fail",
                message: "Doctor not found"
            });
        }
        
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};