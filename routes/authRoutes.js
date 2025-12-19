const express = require('express');
const authController = require('../controller/authController');
const authRoutes = express.Router();

authRoutes.post('/login', authController.login);
authRoutes.post('/signup', authController.signup);
authRoutes.get('/getAllUsers', authController.getAllUsers);

module.exports = authRoutes;