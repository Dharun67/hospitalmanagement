const express = require('express');
const router = express.Router();
const pharmacyController = require('../controller/pharmacyController');

router.get('/', pharmacyController.getAllMedicinesData);
router.get('/type/:type', pharmacyController.getMedicinesByType);
router.post('/medicine', pharmacyController.createMedicine);
router.put('/medicine/:id', pharmacyController.updateMedicine);
router.delete('/medicine/:id', pharmacyController.deleteMedicine);

module.exports = router;