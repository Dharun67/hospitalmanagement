const express = require('express');
const router = express.Router();
const departmentController = require('../controller/departmentController');

router.get('/', departmentController.getAllDepartmentsData);
router.get('/floor/:floor', departmentController.getDepartmentsByFloor);
router.post('/department', departmentController.createDepartment);
router.put('/department/:id', departmentController.updateDepartment);
router.delete('/department/:id', departmentController.deleteDepartment);

module.exports = router;