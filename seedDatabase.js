const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const {
  Hospital,
  Doctor,
  Patient,
  Appointment,
  Department,
  Medicine,
  Staff,
  Room,
  User
} = require('./Model/mongoModels');

dotenv.config({ path: "./config.env" });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Hospital.deleteMany({}),
      Doctor.deleteMany({}),
      Patient.deleteMany({}),
      Department.deleteMany({}),
      Medicine.deleteMany({}),
      Staff.deleteMany({}),
      Room.deleteMany({})
    ]);

    // Create Users
    const hashedPassword = await bcrypt.hash('123456', 12);
    const users = [
      {
        id: 'USER1',
        username: 'admin',
        email: 'admin@hospital.com',
        password: hashedPassword,
        role: 'admin'
      },
      {
        id: 'USER2',
        username: 'doctor1',
        email: 'doctor@hospital.com',
        password: hashedPassword,
        role: 'doctor'
      },
      {
        id: 'USER3',
        username: 'staff1',
        email: 'staff@hospital.com',
        password: hashedPassword,
        role: 'staff'
      }
    ];

    // Create Hospitals
    const hospitals = [
      {
        id: 'H001',
        name: 'City General Hospital',
        location: 'Downtown',
        type: 'General',
        contact: '+1234567890',
        email: 'info@citygeneral.com',
        capacity: 500,
        rating: 4.5,
        open24x7: true
      },
      {
        id: 'H002',
        name: 'Metro Medical Center',
        location: 'Uptown',
        type: 'Specialty',
        contact: '+1234567891',
        email: 'info@metromedical.com',
        capacity: 300,
        rating: 4.2,
        open24x7: true
      }
    ];

    // Create Doctors
    const doctors = [
      {
        id: 'D001',
        name: 'Dr. John Smith',
        specialization: 'Cardiology',
        experience: '10 years',
        rating: 4.8,
        available: true,
        timing: '9:00 AM - 5:00 PM'
      },
      {
        id: 'D002',
        name: 'Dr. Sarah Johnson',
        specialization: 'Neurology',
        experience: '8 years',
        rating: 4.6,
        available: true,
        timing: '10:00 AM - 6:00 PM'
      },
      {
        id: 'D003',
        name: 'Dr. Mike Wilson',
        specialization: 'Orthopedics',
        experience: '12 years',
        rating: 4.7,
        available: false,
        timing: '8:00 AM - 4:00 PM'
      }
    ];

    // Create Patients
    const patients = [
      {
        id: 'P001',
        name: 'Alice Brown',
        age: 35,
        gender: 'Female',
        phone: '+1234567892',
        address: '123 Main St',
        bloodGroup: 'A+',
        admitted: false,
        visitDate: '2024-01-15'
      },
      {
        id: 'P002',
        name: 'Bob Davis',
        age: 42,
        gender: 'Male',
        phone: '+1234567893',
        address: '456 Oak Ave',
        bloodGroup: 'O-',
        admitted: true,
        roomId: 'R101',
        visitDate: '2024-01-10'
      }
    ];

    // Create Departments
    const departments = [
      {
        id: 'DEPT001',
        name: 'Cardiology',
        head: 'Dr. John Smith',
        floor: 2,
        patientCount: 25
      },
      {
        id: 'DEPT002',
        name: 'Neurology',
        head: 'Dr. Sarah Johnson',
        floor: 3,
        patientCount: 18
      },
      {
        id: 'DEPT003',
        name: 'Emergency',
        head: 'Dr. Mike Wilson',
        floor: 1,
        patientCount: 12
      }
    ];

    // Create Medicines
    const medicines = [
      {
        id: 'MED001',
        name: 'Paracetamol',
        type: 'Tablet',
        stock: 500,
        price: 2.50
      },
      {
        id: 'MED002',
        name: 'Amoxicillin',
        type: 'Capsule',
        stock: 200,
        price: 8.75
      },
      {
        id: 'MED003',
        name: 'Ibuprofen',
        type: 'Tablet',
        stock: 300,
        price: 3.25
      }
    ];

    // Create Staff
    const staff = [
      {
        id: 'S001',
        name: 'Nurse Mary',
        role: 'Nurse',
        shift: 'Day',
        salary: 45000,
        joiningDate: '2023-01-15',
        status: 'Active'
      },
      {
        id: 'S002',
        name: 'Tech Support Tom',
        role: 'IT Support',
        shift: 'Day',
        salary: 55000,
        joiningDate: '2023-03-20',
        status: 'Active'
      }
    ];

    // Create Rooms
    const rooms = [
      {
        id: 'ROOM001',
        roomId: 'R101',
        type: 'General',
        occupied: true
      },
      {
        id: 'ROOM002',
        roomId: 'R102',
        type: 'General',
        occupied: false
      },
      {
        id: 'ROOM003',
        roomId: 'R201',
        type: 'ICU',
        occupied: false
      },
      {
        id: 'ROOM004',
        roomId: 'R301',
        type: 'Private',
        occupied: false
      }
    ];

    // Insert all data
    await User.insertMany(users);
    await Hospital.insertMany(hospitals);
    await Doctor.insertMany(doctors);
    await Patient.insertMany(patients);
    await Department.insertMany(departments);
    await Medicine.insertMany(medicines);
    await Staff.insertMany(staff);
    await Room.insertMany(rooms);

    console.log('✅ Database seeded successfully!');
    console.log('📧 Test login credentials:');
    console.log('   Email: admin@hospital.com');
    console.log('   Password: 123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();