const Patient = require('../Model/patientModel');

// Generate unique patient ID
const generatePatientId = async () => {
    const lastPatient = await Patient.findOne().sort({ id: -1 });
    if (!lastPatient) return 'PAT501';
    const lastNum = parseInt(lastPatient.id.replace('PAT', ''));
    return `PAT${lastNum + 1}`;
};

// GET all patients data
exports.getAllPatientsData = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({
            status: "success",
            count: patients.length,
            data: patients
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// GET patients by blood group
exports.getPatientsByBloodGroup = async (req, res) => {
    try {
        const { bloodGroup } = req.params;
        const patients = await Patient.find({ bloodGroup });
        
        res.status(200).json({
            status: "success",
            bloodGroup: bloodGroup,
            count: patients.length,
            data: patients
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// CREATE patient
exports.createPatient = async (req, res) => {
    try {
        const patientId = await generatePatientId();
        const newPatient = await Patient.create({
            ...req.body,
            id: patientId
        });
        res.status(201).json({
            status: "success",
            data: newPatient
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// UPDATE patient
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedPatient) {
            return res.status(404).json({
                status: "fail",
                message: "Patient not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: updatedPatient
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// DELETE patient
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndDelete(id);
        
        if (!deletedPatient) {
            return res.status(404).json({
                status: "fail",
                message: "Patient not found"
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