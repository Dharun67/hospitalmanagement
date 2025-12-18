const mongoose = require('mongoose');
const {
  Hospital: HospitalModel,
  Doctor,
  Patient,
  Appointment,
  Department,
  Medicine,
  Staff,
  Room,
  Billing,
  Surgery,
  Emergency,
  Consultation
} = require('../models/mongoModels');
const hospitalData = require('../hospital.json');

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Promise.all([
      HospitalModel.deleteMany({}),
      Doctor.deleteMany({}),
      Patient.deleteMany({}),
      Appointment.deleteMany({}),
      Department.deleteMany({}),
      Medicine.deleteMany({}),
      Staff.deleteMany({}),
      Room.deleteMany({}),
      Billing.deleteMany({}),
      Surgery.deleteMany({}),
      Emergency.deleteMany({}),
      Consultation.deleteMany({})
    ]);

    // Insert data
    await HospitalModel.create(hospitalData.hospital);
    await Doctor.insertMany(hospitalData.doctors);
    await Patient.insertMany(hospitalData.patients);
    await Appointment.insertMany(hospitalData.appointments);
    await Department.insertMany(hospitalData.departments);
    await Medicine.insertMany(hospitalData.pharmacy);
    await Staff.insertMany(hospitalData.staff);
    await Room.insertMany(hospitalData.rooms);
    await Billing.insertMany(hospitalData.billing);
    await Surgery.insertMany(hospitalData.surgeries);
    await Emergency.insertMany(hospitalData.emergencies);
    await Consultation.insertMany(hospitalData.onlineConsultations);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;