const Appointment = require('../Model/appointmentModel');
const Doctor = require('../Model/doctorModel');
const Patient = require('../Model/patientModel');

exports.getAllAppointmentsData = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        
        const appointmentsWithDetails = await Promise.all(
            appointments.map(async (appointment) => {
                const patient = await Patient.findOne({ id: appointment.patientId });
                const doctor = await Doctor.findOne({ id: appointment.doctorId });
                
                return {
                    _id: appointment._id,
                    id: appointment.id,
                    patientId: appointment.patientId,
                    patientDetails: patient ? [patient] : [],
                    doctorId: appointment.doctorId,
                    doctorDetails: doctor ? [doctor] : [],
                    date: appointment.date,
                    time: appointment.time,
                    status: appointment.status,
                    fee: appointment.fee,
                    paymentMethod: appointment.paymentMethod,
                    paymentStatus: appointment.paymentStatus
                };
            })
        );
        
        res.status(200).json({
            status: "success",
            count: appointmentsWithDetails.length,
            data: appointmentsWithDetails
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getAppointmentsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const appointments = await Appointment.find({ 
            status: new RegExp(status, 'i') 
        });
        
        const appointmentsWithDetails = await Promise.all(
            appointments.map(async (appointment) => {
                const patient = await Patient.findOne({ id: appointment.patientId });
                const doctor = await Doctor.findOne({ id: appointment.doctorId });
                
                return {
                    _id: appointment._id,
                    id: appointment.id,
                    patientId: appointment.patientId,
                    patientDetails: patient ? [patient] : [],
                    doctorId: appointment.doctorId,
                    doctorDetails: doctor ? [doctor] : [],
                    date: appointment.date,
                    time: appointment.time,
                    status: appointment.status,
                    fee: appointment.fee,
                    paymentMethod: appointment.paymentMethod,
                    paymentStatus: appointment.paymentStatus
                };
            })
        );
        
        res.status(200).json({
            status: "success",
            appointmentStatus: status,
            count: appointmentsWithDetails.length,
            data: appointmentsWithDetails
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        
        if (!appointment) {
            return res.status(404).json({
                status: "fail",
                message: "Appointment not found"
            });
        }
        
        const patient = await Patient.findOne({ id: appointment.patientId });
        const doctor = await Doctor.findOne({ id: appointment.doctorId });
        
        res.status(200).json({
            status: "success",
            data: {
                _id: appointment._id,
                id: appointment.id,
                patientId: appointment.patientId,
                patientDetails: patient ? [patient] : [],
                doctorId: appointment.doctorId,
                doctorDetails: doctor ? [doctor] : [],
                date: appointment.date,
                time: appointment.time,
                status: appointment.status,
                fee: appointment.fee,
                paymentMethod: appointment.paymentMethod,
                paymentStatus: appointment.paymentStatus
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        });
    }
};

// Generate unique appointment ID
const generateAppointmentId = async () => {
    const lastAppointment = await Appointment.findOne().sort({ id: -1 });
    if (!lastAppointment) return 'APT901';
    const lastNum = parseInt(lastAppointment.id.replace('APT', ''));
    return `APT${lastNum + 1}`;
};

exports.createAppointment = async (req, res) => {
    try {
        const appointmentId = await generateAppointmentId();
        const newAppointment = await Appointment.create({
            ...req.body,
            id: appointmentId
        });
        
        const patient = await Patient.findOne({ id: newAppointment.patientId });
        const doctor = await Doctor.findOne({ id: newAppointment.doctorId });
        
        res.status(201).json({
            status: "success",
            data: {
                _id: newAppointment._id,
                id: newAppointment.id,
                patientId: newAppointment.patientId,
                patientDetails: patient ? [patient] : [],
                doctorId: newAppointment.doctorId,
                doctorDetails: doctor ? [doctor] : [],
                date: newAppointment.date,
                time: newAppointment.time,
                status: newAppointment.status,
                fee: newAppointment.fee,
                paymentMethod: newAppointment.paymentMethod,
                paymentStatus: newAppointment.paymentStatus
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        if (!updatedAppointment) {
            return res.status(404).json({
                status: "fail",
                message: "Appointment not found"
            });
        }
        
        const patient = await Patient.findOne({ id: updatedAppointment.patientId });
        const doctor = await Doctor.findOne({ id: updatedAppointment.doctorId });
        
        res.status(200).json({
            status: "success",
            data: {
                _id: updatedAppointment._id,
                id: updatedAppointment.id,
                patientId: updatedAppointment.patientId,
                patientDetails: patient ? [patient] : [],
                doctorId: updatedAppointment.doctorId,
                doctorDetails: doctor ? [doctor] : [],
                date: updatedAppointment.date,
                time: updatedAppointment.time,
                status: updatedAppointment.status,
                fee: updatedAppointment.fee,
                paymentMethod: updatedAppointment.paymentMethod,
                paymentStatus: updatedAppointment.paymentStatus
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        
        if (!deletedAppointment) {
            return res.status(404).json({
                status: "fail",
                message: "Appointment not found"
            });
        }
        
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
};