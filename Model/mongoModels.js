const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: String,
  type: String,
  contact: String,
  email: String,
  capacity: Number,
  rating: Number,
  open24x7: Boolean
});

const doctorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialization: String,
  experience: String,
  rating: Number,
  available: Boolean,
  timing: String
});

const patientSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: Number,
  gender: String,
  phone: String,
  address: String,
  bloodGroup: String,
  admitted: Boolean,
  roomId: String,
  visitDate: String
});

const appointmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  date: String,
  time: String,
  status: String,
  fee: Number,
  paymentMethod: String,
  paymentStatus: String
});

const departmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  head: String,
  floor: Number,
  patientCount: Number
});

const medicineSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  type: String,
  stock: Number,
  price: Number
});

const staffSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String,
  shift: String,
  salary: Number,
  joiningDate: String,
  status: String
});

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  roomId: { type: String, required: true, unique: true },
  type: String,
  occupied: Boolean
});

const billingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: String,
  roomCharge: Number,
  doctorFee: Number,
  pharmacyCharges: Number,
  total: Number,
  status: String,
  date: String
});

const surgerySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: String,
  doctorId: String,
  type: String,
  date: String,
  time: String,
  status: String
});

const emergencySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientName: String,
  condition: String,
  severity: String,
  arrivalTime: String,
  status: String
});

const consultationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  patientId: String,
  doctorId: String,
  date: String,
  time: String,
  status: String,
  meetingLink: String,
  requirements: String,
  fee: Number,
  paymentMethod: String,
  paymentStatus: String
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'staff' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Hospital: mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema),
  Doctor: mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema),
  Patient: mongoose.models.Patient || mongoose.model('Patient', patientSchema),
  Appointment: mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema),
  Department: mongoose.models.Department || mongoose.model('Department', departmentSchema),
  Medicine: mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema),
  Staff: mongoose.models.Staff || mongoose.model('Staff', staffSchema),
  Room: mongoose.models.Room || mongoose.model('Room', roomSchema),
  Billing: mongoose.models.Billing || mongoose.model('Billing', billingSchema),
  Surgery: mongoose.models.Surgery || mongoose.model('Surgery', surgerySchema),
  Emergency: mongoose.models.Emergency || mongoose.model('Emergency', emergencySchema),
  Consultation: mongoose.models.Consultation || mongoose.model('Consultation', consultationSchema),
  User: mongoose.models.User || mongoose.model('User', userSchema)
};