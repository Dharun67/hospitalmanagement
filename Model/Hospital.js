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
} = require('./mongoModels');

class Hospital {
  // Hospital Info
  async getHospitalInfo() {
    return await HospitalModel.findOne();
  }

  // Doctors
  async getAllDoctors() {
    return await Doctor.find();
  }

  async getDoctorById(id) {
    return await Doctor.findOne({ id });
  }

  async addDoctor(doctor) {
    return await Doctor.create(doctor);
  }

  async updateDoctor(id, updates) {
    return await Doctor.findOneAndUpdate({ id }, updates, { new: true });
  }

  async deleteDoctor(id) {
    return await Doctor.findOneAndDelete({ id });
  }

  // Patients
  async getAllPatients() {
    return await Patient.find();
  }

  async getPatientById(id) {
    return await Patient.findOne({ id });
  }

  async addPatient(patient) {
    return await Patient.create(patient);
  }

  async updatePatient(id, updates) {
    return await Patient.findOneAndUpdate({ id }, updates, { new: true });
  }

  async deletePatient(id) {
    return await Patient.findOneAndDelete({ id });
  }

  // Appointments
  async getAllAppointments() {
    return await Appointment.find();
  }

  async getAppointmentById(id) {
    return await Appointment.findOne({ id });
  }

  async addAppointment(appointment) {
    return await Appointment.create(appointment);
  }

  async updateAppointment(id, updates) {
    return await Appointment.findOneAndUpdate({ id }, updates, { new: true });
  }

  async deleteAppointment(id) {
    return await Appointment.findOneAndDelete({ id });
  }

  // Departments
  async getAllDepartments() {
    return await Department.find();
  }

  // Pharmacy
  async getAllMedicines() {
    return await Medicine.find();
  }

  // Staff
  async getAllStaff() {
    return await Staff.find();
  }

  // Rooms
  async getAllRooms() {
    return await Room.find();
  }

  // Billing
  async getAllBills() {
    return await Billing.find();
  }

  // Surgeries
  async getAllSurgeries() {
    return await Surgery.find();
  }

  // Emergencies
  async getAllEmergencies() {
    return await Emergency.find();
  }

  // Online Consultations
  async getAllConsultations() {
    return await Consultation.find();
  }
}

module.exports = Hospital;