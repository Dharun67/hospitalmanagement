const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController');

// GET all doctors data (complete hospital.json)
router.get('/', doctorController.getAllDoctorsData);

// GET doctors by specialization
router.get('/specialization/:specialization', doctorController.getDoctorsBySpecialization);

// CREATE doctor
router.post('/doctor', doctorController.createDoctor);

// UPDATE doctor
router.put('/doctor/:id', doctorController.updateDoctor);

// DELETE doctor
router.delete('/doctor/:id', doctorController.deleteDoctor);

module.exports = router;