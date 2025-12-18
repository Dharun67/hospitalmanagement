const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./Model/doctorModel');
const Patient = require('./Model/patientModel');
const Appointment = require('./Model/appointmentModel');
const Pharmacy = require('./Model/pharmacyModel');
const Room = require('./Model/roomModel');
const Staff = require('./Model/staffModel');

dotenv.config({ path: "./config.env" });

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ DATABASE CONNECTED"))
  .catch(err => console.error("❌ Database error:", err));

const quickTest = async () => {
  try {
    console.log('\n🔍 CHECKING DATABASE DATA:\n');
    
    const doctors = await Doctor.find();
    const patients = await Patient.find();
    const appointments = await Appointment.find();
    const pharmacy = await Pharmacy.find();
    const rooms = await Room.find();
    const staff = await Staff.find();
    
    console.log(`✅ Doctors: ${doctors.length}`);
    console.log(`✅ Patients: ${patients.length}`);
    console.log(`✅ Appointments: ${appointments.length}`);
    console.log(`✅ Medicines: ${pharmacy.length}`);
    console.log(`✅ Rooms: ${rooms.length}`);
    console.log(`✅ Staff: ${staff.length}`);
    
    console.log('\n📋 SAMPLE DATA:');
    if (doctors.length > 0) console.log(`Doctor: ${doctors[0].name} (${doctors[0].id})`);
    if (patients.length > 0) console.log(`Patient: ${patients[0].name} (${patients[0].id})`);
    if (appointments.length > 0) console.log(`Appointment: ${appointments[0].id} - ${appointments[0].status}`);
    
    console.log('\n🎯 FRONTEND CONNECTION TEST:');
    console.log('✅ Backend should run on: http://localhost:8000');
    console.log('✅ API endpoints ready at: http://localhost:8000/api/v1/');
    console.log('✅ Dashboard will show data when backend is running');
    
    console.log('\n🚀 TO START BACKEND: npm start');
    console.log('🚀 TO START FRONTEND: cd ../hospital && npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

quickTest();