const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');

// GET all patients data
router.get('/', patientController.getAllPatientsData);

// GET patients by blood group
router.get('/bloodgroup/:bloodGroup', patientController.getPatientsByBloodGroup);

// CREATE patient
router.post('/patient', patientController.createPatient);

// UPDATE patient
router.put('/patient/:id', patientController.updatePatient);

// DELETE patient
router.delete('/patient/:id', patientController.deletePatient);

module.exports = router;