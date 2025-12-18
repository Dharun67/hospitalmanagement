const Staff = require('../Model/staffModel');

// Generate unique staff ID
const generateStaffId = async () => {
    const lastStaff = await Staff.findOne().sort({ id: -1 });
    if (!lastStaff) return 'STF001';
    const lastNum = parseInt(lastStaff.id.replace('STF', ''));
    return `STF${String(lastNum + 1).padStart(3, '0')}`;
};

// GET all staff
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.find();
        res.status(200).json({
            status: "success",
            count: staff.length,
            data: staff
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// GET staff by role
exports.getStaffByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const staff = await Staff.find({ role });
        
        res.status(200).json({
            status: "success",
            role: role,
            count: staff.length,
            data: staff
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// CREATE staff
exports.createStaff = async (req, res) => {
    try {
        const staffId = await generateStaffId();
        const newStaff = await Staff.create({
            ...req.body,
            id: staffId
        });
        res.status(201).json({
            status: "success",
            data: newStaff
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// UPDATE staff
exports.updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStaff = await Staff.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedStaff) {
            return res.status(404).json({
                status: "fail",
                message: "Staff member not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: updatedStaff
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

// DELETE staff
exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStaff = await Staff.findByIdAndDelete(id);
        
        if (!deletedStaff) {
            return res.status(404).json({
                status: "fail",
                message: "Staff member not found"
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