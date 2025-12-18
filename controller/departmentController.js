const Department = require('../Model/departmentModel');
const fs = require('fs');
const path = require('path');

const hospitalFilePath = path.join(__dirname, '../hospital.json');

exports.getAllDepartmentsData = async (req, res) => {
    try {
        const hospitalData = JSON.parse(fs.readFileSync(hospitalFilePath, 'utf-8'));
        res.status(200).json({
            status: "success",
            count: hospitalData.departments.length,
            data: hospitalData.departments
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getDepartmentsByFloor = async (req, res) => {
    try {
        const { floor } = req.params;
        const hospitalData = JSON.parse(fs.readFileSync(hospitalFilePath, 'utf-8'));
        
        const departments = hospitalData.departments.filter(dept => 
            dept.floor === parseInt(floor)
        );
        
        res.status(200).json({
            status: "success",
            floor: parseInt(floor),
            count: departments.length,
            data: departments
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.createDepartment = async (req, res) => {
    try {
        const newDepartment = await Department.create(req.body);
        res.status(201).json({
            status: "success",
            data: newDepartment
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedDepartment) {
            return res.status(404).json({
                status: "fail",
                message: "Department not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            data: updatedDepartment
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        
        if (!deletedDepartment) {
            return res.status(404).json({
                status: "fail",
                message: "Department not found"
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