const express = require('express');
const router = express.Router();
const { getAllHospitals } = require('../controller/hospitalController');

router.get('/', getAllHospitals);

module.exports = router;