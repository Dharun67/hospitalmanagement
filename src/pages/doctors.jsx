import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/appointments.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [onlineConsultations, setOnlineConsultations] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageMode, setShowManageMode] = useState(false);
  const [showDetailsMode, setShowDetailsMode] = useState(false);
  const [showAppointmentsMode, setShowAppointmentsMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingDoctor, setViewingDoctor] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: '', specialization: '', experience: '', rating: 4.0, available: true, timing: ''
  });

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/doctors/add') {
      setShowAddForm(true);
      setShowManageMode(false);
      setShowDetailsMode(false);
      setShowAppointmentsMode(false);
    } else if (location.pathname === '/doctors/manage') {
      setShowManageMode(true);
      setShowAddForm(false);
      setShowDetailsMode(false);
      setShowAppointmentsMode(false);
    } else if (location.pathname === '/doctors/details') {
      setShowDetailsMode(true);
      setShowAddForm(false);
      setShowManageMode(false);
      setShowAppointmentsMode(false);
    } else if (location.pathname === '/doctors/appointments') {
      setShowAppointmentsMode(true);
      setShowAddForm(false);
      setShowManageMode(false);
      setShowDetailsMode(false);
    } else {
      setShowAddForm(false);
      setShowManageMode(false);
      setShowDetailsMode(false);
      setShowAppointmentsMode(false);
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      
      const savedDoctors = localStorage.getItem('hospitalDoctors');
      const savedAppointments = localStorage.getItem('hospitalAppointments');
      const savedPatients = localStorage.getItem('hospitalPatients');
      
      setDoctors(savedDoctors ? JSON.parse(savedDoctors) : data.doctors);
      setAppointments(savedAppointments ? JSON.parse(savedAppointments) : data.appointments);
      setOnlineConsultations(data.onlineConsultations || []);
      setPatients(savedPatients ? JSON.parse(savedPatients) : data.patients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const generateDoctorId = () => {
    const lastId = doctors[doctors.length - 1]?.id || 'DOC100';
    const num = parseInt(lastId.replace('DOC', '')) + 1;
    return `DOC${num}`;
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: generateDoctorId(),
      ...doctorData
    };
    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    
    localStorage.setItem('hospitalDoctors', JSON.stringify(updatedDoctors));
    
    setDoctorData({ name: '', specialization: '', experience: '', rating: 4.0, available: true, timing: '' });
    setShowAddForm(false);
    window.history.pushState({}, '', '/doctors');
  };

  const handleEditDoctor = (doctor) => {
    setEditingDoctor(doctor.id);
    setDoctorData({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      rating: doctor.rating,
      available: doctor.available,
      timing: doctor.timing
    });
  };

  const handleUpdateDoctor = (e) => {
    e.preventDefault();
    const updatedDoctors = doctors.map(d => 
      d.id === editingDoctor ? { ...d, ...doctorData } : d
    );
    setDoctors(updatedDoctors);
    
    localStorage.setItem('hospitalDoctors', JSON.stringify(updatedDoctors));
    
    setEditingDoctor(null);
    setDoctorData({ name: '', specialization: '', experience: '', rating: 4.0, available: true, timing: '' });
  };

  const handleDeleteDoctor = (id) => {
    if (window.confirm('Delete this doctor?')) {
      const updatedDoctors = doctors.filter(d => d.id !== id);
      setDoctors(updatedDoctors);
      
      localStorage.setItem('hospitalDoctors', JSON.stringify(updatedDoctors));
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorAppointments = (doctorId) => {
    const regularAppts = appointments.filter(apt => apt.doctorId === doctorId);
    const consultations = onlineConsultations.filter(cons => cons.doctorId === doctorId);
    return regularAppts.length + consultations.length;
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Doctors {showAddForm ? '- Add New' : showManageMode ? '- Manage' : showDetailsMode ? '- Details' : showAppointmentsMode ? '- Appointments' : ''}</h1>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{doctors.length}</span>
          <span className="label">Total Doctors</span>
        </div>
        <div className="stat">
          <span className="number">{doctors.filter(d => d.available).length}</span>
          <span className="label">Available</span>
        </div>
        <div className="stat">
          <span className="number">{[...new Set(doctors.map(d => d.specialization))].length}</span>
          <span className="label">Specializations</span>
        </div>
        <div className="stat">
          <span className="number">{appointments.length + onlineConsultations.length}</span>
          <span className="label">Total Appointments</span>
        </div>
      </div>

      {!showAddForm && (
        <div className="controls">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search"
          />
        </div>
      )}

      {!showAddForm && !showAppointmentsMode && (
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Rating</th>
                <th>Timing</th>
                <th>Status</th>
                {(showManageMode || showDetailsMode) && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.experience}</td>
                  <td>⭐ {doctor.rating}</td>
                  <td>{doctor.timing}</td>
                  <td>
                    <span className={`status ${doctor.available ? 'confirmed' : 'cancelled'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  {(showManageMode || showDetailsMode) && (
                    <td>
                      <button className="btn-view" onClick={() => setViewingDoctor(doctor)}>View</button>
                      {showManageMode && (
                        <>
                          <button className="btn-edit" onClick={() => handleEditDoctor(doctor)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
                        </>
                      )}
                      {showDetailsMode && (
                        <button className="btn-delete" onClick={() => handleDeleteDoctor(doctor.id)}>Delete</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAppointmentsMode && (
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>
                    <span className="status scheduled">Appointment</span>
                  </td>
                  <td>
                    <div>{doctors.find(d => d.id === appointment.doctorId)?.name || 'Unknown'}</div>
                    <small>{doctors.find(d => d.id === appointment.doctorId)?.specialization || ''}</small>
                  </td>
                  <td>{getPatientName(appointment.patientId)}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
              {onlineConsultations.map(consultation => (
                <tr key={consultation.id}>
                  <td>{consultation.id}</td>
                  <td>
                    <span className="status confirmed">Online Consultation</span>
                  </td>
                  <td>
                    <div>{doctors.find(d => d.id === consultation.doctorId)?.name || 'Unknown'}</div>
                    <small>{doctors.find(d => d.id === consultation.doctorId)?.specialization || ''}</small>
                  </td>
                  <td>{getPatientName(consultation.patientId)}</td>
                  <td>{consultation.date}</td>
                  <td>{consultation.time}</td>
                  <td>
                    <span className={`status ${consultation.status.toLowerCase()}`}>
                      {consultation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showAddForm || editingDoctor) && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
              <button className="close" onClick={() => {
                setShowAddForm(false);
                setEditingDoctor(null);
                setDoctorData({ name: '', specialization: '', experience: '', rating: 4.0, available: true, timing: '' });
                if (showAddForm) window.history.pushState({}, '', '/doctors');
              }}>&times;</button>
            </div>
            <form onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input 
                    type="text" 
                    value={doctorData.name} 
                    onChange={(e) => setDoctorData({...doctorData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Specialization *</label>
                  <input 
                    type="text" 
                    value={doctorData.specialization} 
                    onChange={(e) => setDoctorData({...doctorData, specialization: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Experience *</label>
                  <input 
                    type="text" 
                    value={doctorData.experience} 
                    onChange={(e) => setDoctorData({...doctorData, experience: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="5" 
                    step="0.1"
                    value={doctorData.rating} 
                    onChange={(e) => setDoctorData({...doctorData, rating: parseFloat(e.target.value)})} 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Timing *</label>
                  <input 
                    type="text" 
                    value={doctorData.timing} 
                    onChange={(e) => setDoctorData({...doctorData, timing: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Availability</label>
                  <select value={doctorData.available} onChange={(e) => setDoctorData({...doctorData, available: e.target.value === 'true'})}>
                    <option value={true}>Available</option>
                    <option value={false}>Unavailable</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingDoctor ? 'Update Doctor' : 'Add Doctor'}</button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setShowAddForm(false);
                  setEditingDoctor(null);
                  setDoctorData({ name: '', specialization: '', experience: '', rating: 4.0, available: true, timing: '' });
                  if (showAddForm) window.history.pushState({}, '', '/doctors');
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingDoctor && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Doctor Details</h2>
              <button className="close" onClick={() => setViewingDoctor(null)}>&times;</button>
            </div>
            <div className="patient-details">
              <div className="detail-row">
                <strong>ID:</strong> {viewingDoctor.id}
              </div>
              <div className="detail-row">
                <strong>Name:</strong> {viewingDoctor.name}
              </div>
              <div className="detail-row">
                <strong>Specialization:</strong> {viewingDoctor.specialization}
              </div>
              <div className="detail-row">
                <strong>Experience:</strong> {viewingDoctor.experience}
              </div>
              <div className="detail-row">
                <strong>Rating:</strong> ⭐ {viewingDoctor.rating}
              </div>
              <div className="detail-row">
                <strong>Timing:</strong> {viewingDoctor.timing}
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`status ${viewingDoctor.available ? 'confirmed' : 'cancelled'}`}>
                  {viewingDoctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="detail-row">
                <strong>Total Appointments:</strong> {getDoctorAppointments(viewingDoctor.id)}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-delete" onClick={() => {
                handleDeleteDoctor(viewingDoctor.id);
                setViewingDoctor(null);
              }}>Delete Doctor</button>
              <button className="btn-secondary" onClick={() => setViewingDoctor(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;