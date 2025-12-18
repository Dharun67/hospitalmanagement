const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');

router.get('/', staffController.getAllStaff);
router.get('/role/:role', staffController.getStaffByRole);
router.post('/staff', staffController.createStaff);
router.put('/staff/:id', staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);

module.exports = router;