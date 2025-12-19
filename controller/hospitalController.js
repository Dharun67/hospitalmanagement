const { Hospital } = require("../Model/mongoModels");

exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({
            status: "success",
            length: hospitals.length,
            data: hospitals,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.createHospital = async (req, res) => {
    try {
        const newHospital = await Hospital.create(req.body);
        res.status(201).json({
            status: "success",
            data: newHospital,
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.getHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: hospital,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
};

exports.updateHospital = async (req, res) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            data: updatedHospital,
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message,
        });
    }
}; 

exports.deleteHospital = async(req,res) => { 
    try{
        await Hospital.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    }catch(err){
        res.status(500).json({
            status: "fail",
            message: err.message,
        });     
    }   
}