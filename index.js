const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const roomRoutes = require('./routes/roomRoutes');
const staffRoutes = require('./routes/staffRoutes');

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hospital', hospitalRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/patients', patientRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/pharmacy', pharmacyRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/staff', staffRoutes);

module.exports = app;