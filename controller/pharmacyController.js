const Pharmacy = require('../Model/pharmacyModel');

// Generate unique medicine ID
const generateMedicineId = async () => {
    const lastMedicine = await Pharmacy.findOne().sort({ id: -1 });
    if (!lastMedicine) return 'MED301';
    const lastNum = parseInt(lastMedicine.id.replace('MED', ''));
    return `MED${lastNum + 1}`;
};

exports.getAllMedicinesData = async (req, res) => {
    try {
        const medicines = await Pharmacy.find();
        res.status(200).json({
            status: "success",
            count: medicines.length,
            data: medicines
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getMedicinesByType = async (req, res) => {
    try {
        const { type } = req.params;
        const medicines = await Pharmacy.find({ 
            type: new RegExp(type, 'i') 
        });
        
        res.status(200).json({
            status: "success",
            medicineType: type,
            count: medicines.length,
            data: medicines
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.createMedicine = async (req, res) => {
    try {
        const medicineId = await generateMedicineId();
        const newMedicine = await Pharmacy.create({
            ...req.body,
            id: medicineId
        });
        res.status(201).json({
            status: "success",
            data: newMedicine
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedMedicine) {
            return res.status(404).json({
                status: "fail",
                message: "Medicine not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: updatedMedicine
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.deleteMedicine = async (req, res) => {
    try {
        const deletedMedicine = await Pharmacy.findByIdAndDelete(req.params.id);
        
        if (!deletedMedicine) {
            return res.status(404).json({
                status: "fail",
                message: "Medicine not found"
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