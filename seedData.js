const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('./Model/hospitalModel');
const Doctor = require('./Model/doctorModel');
const Patient = require('./Model/patientModel');
const Appointment = require('./Model/appointmentModel');
const Department = require('./Model/departmentModel');
const Pharmacy = require('./Model/pharmacyModel');
const Staff = require('./Model/staffModel');
const Room = require('./Model/roomModel');
const hospitalData = require('./hospital.json');

dotenv.config({path:"./config.env"});

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Hospital.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await Department.deleteMany({});
    await Pharmacy.deleteMany({});
    await Staff.deleteMany({});
    await Room.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Hospital.create(hospitalData.hospital);
    await Doctor.insertMany(hospitalData.doctors);
    await Patient.insertMany(hospitalData.patients);
    await Appointment.insertMany(hospitalData.appointments);
    await Department.insertMany(hospitalData.departments);
    await Pharmacy.insertMany(hospitalData.pharmacy);
    await Staff.insertMany(hospitalData.staff);
    await Room.insertMany(hospitalData.rooms);

    console.log('🎉 Database seeded successfully!');
    console.log('📊 Data inserted:');
    console.log(`   - Hospital: 1 record`);
    console.log(`   - Doctors: ${hospitalData.doctors.length} records`);
    console.log(`   - Patients: ${hospitalData.patients.length} records`);
    console.log(`   - Appointments: ${hospitalData.appointments.length} records`);
    console.log(`   - Departments: ${hospitalData.departments.length} records`);
    console.log(`   - Medicines: ${hospitalData.pharmacy.length} records`);
    console.log(`   - Staff: ${hospitalData.staff.length} records`);
    console.log(`   - Rooms: ${hospitalData.rooms.length} records`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();