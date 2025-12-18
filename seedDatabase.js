const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./Model/doctorModel');
const Patient = require('./Model/patientModel');
const Appointment = require('./Model/appointmentModel');
const Pharmacy = require('./Model/pharmacyModel');
const Room = require('./Model/roomModel');
const Staff = require('./Model/staffModel');

dotenv.config({ path: "./config.env" });

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("DATABASE SUCCESSFULLY CONNECTED"))
  .catch(err => console.error(err));

const seedData = async () => {
  try {
    // Clear existing data
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
    await Appointment.deleteMany({});
    await Pharmacy.deleteMany({});
    await Room.deleteMany({});
    await Staff.deleteMany({});

    // Seed Doctors
    const doctors = [
      { id: 'DOC101', name: 'Dr. Rajesh Kumar', specialization: 'Cardiology', experience: '15 years', rating: 4.8, available: true, timing: '9:00 AM - 5:00 PM' },
      { id: 'DOC102', name: 'Dr. Priya Sharma', specialization: 'Neurology', experience: '12 years', rating: 4.7, available: true, timing: '10:00 AM - 6:00 PM' },
      { id: 'DOC103', name: 'Dr. Amit Patel', specialization: 'Orthopedics', experience: '18 years', rating: 4.9, available: true, timing: '8:00 AM - 4:00 PM' },
      { id: 'DOC104', name: 'Dr. Sunita Rao', specialization: 'Pediatrics', experience: '10 years', rating: 4.6, available: true, timing: '9:00 AM - 5:00 PM' },
      { id: 'DOC105', name: 'Dr. Vikram Singh', specialization: 'General Medicine', experience: '20 years', rating: 4.5, available: true, timing: '7:00 AM - 3:00 PM' }
    ];
    await Doctor.insertMany(doctors);

    // Seed Patients
    const patients = [
      { id: 'PAT501', name: 'Ravi Kumar', age: 45, gender: 'Male', phone: '+91-9876543210', address: '123 Main St, Delhi', bloodGroup: 'O+', admitted: false, visitDate: '2024-01-15' },
      { id: 'PAT502', name: 'Meera Patel', age: 32, gender: 'Female', phone: '+91-9876543211', address: '456 Park Ave, Mumbai', bloodGroup: 'A+', admitted: true, visitDate: '2024-01-16' },
      { id: 'PAT503', name: 'Suresh Gupta', age: 28, gender: 'Male', phone: '+91-9876543212', address: '789 Lake View, Bangalore', bloodGroup: 'B+', admitted: false, visitDate: '2024-01-17' },
      { id: 'PAT504', name: 'Anita Verma', age: 55, gender: 'Female', phone: '+91-9876543213', address: '321 Hill Road, Chennai', bloodGroup: 'AB+', admitted: true, visitDate: '2024-01-18' },
      { id: 'PAT505', name: 'Rohit Sharma', age: 38, gender: 'Male', phone: '+91-9876543214', address: '654 Beach Road, Goa', bloodGroup: 'O-', admitted: false, visitDate: '2024-01-19' }
    ];
    await Patient.insertMany(patients);

    // Seed Appointments
    const appointments = [
      { id: 'APT901', patientId: 'PAT501', doctorId: 'DOC101', date: '2024-01-20', time: '10:00 AM', status: 'Scheduled' },
      { id: 'APT902', patientId: 'PAT502', doctorId: 'DOC102', date: '2024-01-21', time: '11:00 AM', status: 'Confirmed' },
      { id: 'APT903', patientId: 'PAT503', doctorId: 'DOC103', date: '2024-01-22', time: '2:00 PM', status: 'Completed', fee: 500, paymentMethod: 'Cash', paymentStatus: 'Paid' }
    ];
    await Appointment.insertMany(appointments);

    // Seed Pharmacy
    const medicines = [
      { id: 'MED301', name: 'Paracetamol 500mg', type: 'Tablet', stock: 500, price: 2 },
      { id: 'MED302', name: 'Amoxicillin 250mg', type: 'Capsule', stock: 200, price: 8 },
      { id: 'MED303', name: 'Crocin Advance', type: 'Tablet', stock: 300, price: 3 },
      { id: 'MED304', name: 'Cetirizine 10mg', type: 'Tablet', stock: 150, price: 1.5 },
      { id: 'MED305', name: 'Omeprazole 20mg', type: 'Capsule', stock: 100, price: 12 }
    ];
    await Pharmacy.insertMany(medicines);

    // Seed Rooms
    const rooms = [
      { id: 'R001', roomNumber: 'ICU-101', bedNumber: 'B101-1', type: 'ICU', capacity: 1, occupied: true, patientId: 'PAT502', patientName: 'Meera Patel', admissionDate: '2024-01-16', condition: 'Post Surgery Recovery', equipment: 'Ventilator, Heart Monitor', nurseAssigned: 'Nurse Priya', dailyRate: 8000, status: 'Occupied' },
      { id: 'R002', roomNumber: 'GW-201', bedNumber: 'B201-1', type: 'General', capacity: 4, occupied: true, patientId: 'PAT504', patientName: 'Anita Verma', admissionDate: '2024-01-18', condition: 'Viral Fever', equipment: 'Basic Care Equipment', nurseAssigned: 'Nurse Sunita', dailyRate: 2500, status: 'Occupied' },
      { id: 'R003', roomNumber: 'ER-301', bedNumber: 'B301-1', type: 'Emergency', capacity: 2, occupied: false, dailyRate: 4500, status: 'Available' }
    ];
    await Room.insertMany(rooms);

    // Seed Staff
    const staff = [
      { id: 'STF001', name: 'Nurse Priya Sharma', role: 'Nurse', shift: 'Morning', salary: 35000, joiningDate: '2023-01-15', phone: '+91-9876543220', status: 'Active' },
      { id: 'STF002', name: 'Nurse Sunita Rao', role: 'Nurse', shift: 'Evening', salary: 32000, joiningDate: '2023-02-20', phone: '+91-9876543221', status: 'Active' },
      { id: 'STF003', name: 'Ramesh Kumar', role: 'Receptionist', shift: 'Full Day', salary: 25000, joiningDate: '2023-03-10', phone: '+91-9876543222', status: 'Active' },
      { id: 'STF004', name: 'Sunil Yadav', role: 'Ward Boy', shift: 'Morning', salary: 18000, joiningDate: '2023-04-05', phone: '+91-9876543223', status: 'Active' },
      { id: 'STF005', name: 'Kavita Singh', role: 'Pharmacist', shift: 'Full Day', salary: 40000, joiningDate: '2023-05-12', phone: '+91-9876543224', status: 'Active' }
    ];
    await Staff.insertMany(staff);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();