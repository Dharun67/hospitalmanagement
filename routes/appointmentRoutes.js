const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointmentController');

router.get('/', appointmentController.getAllAppointmentsData);
router.get('/status/:status', appointmentController.getAppointmentsByStatus);
router.get('/appointment/:id', appointmentController.getAppointmentById);
router.post('/appointment', appointmentController.createAppointment);
router.put('/appointment/:id', appointmentController.updateAppointment);
router.delete('/appointment/:id', appointmentController.deleteAppointment);

module.exports = router;
