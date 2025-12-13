import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/appointments.css';

const OnlineConsultation = () => {
  const [onlineConsultations, setOnlineConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showBookForm, setShowBookForm] = useState(false);
  const [viewingConsultation, setViewingConsultation] = useState(null);
  const [consultationData, setConsultationData] = useState({
    name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+',
    doctorId: '', date: '', time: '', requirements: ''
  });

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/appointments/online-consultation/book') {
      setShowBookForm(true);
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      setOnlineConsultations(data.onlineConsultations || []);
      setDoctors(data.doctors);
      setPatients(data.patients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  const getDoctorSpecialization = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.specialization : '';
  };

  const getPatientPhone = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.phone : '';
  };

  const generateConsultationId = () => {
    const lastId = onlineConsultations[onlineConsultations.length - 1]?.id || 'OC000';
    const num = parseInt(lastId.replace('OC', '')) + 1;
    return `OC${num.toString().padStart(3, '0')}`;
  };

  const generatePatientId = () => {
    const lastId = patients[patients.length - 1]?.id || 'PAT500';
    const num = parseInt(lastId.replace('PAT', '')) + 1;
    return `PAT${num}`;
  };

  const handleBookConsultation = (e) => {
    e.preventDefault();
    
    const newPatient = {
      id: generatePatientId(),
      name: consultationData.name,
      age: consultationData.age,
      gender: consultationData.gender,
      phone: consultationData.phone,
      address: consultationData.address,
      bloodGroup: consultationData.bloodGroup,
      admitted: false,
      visitDate: new Date().toISOString().split('T')[0]
    };
    
    const newConsultation = {
      id: generateConsultationId(),
      patientId: newPatient.id,
      doctorId: consultationData.doctorId,
      date: consultationData.date,
      time: consultationData.time,
      status: 'Scheduled',
      requirements: consultationData.requirements,
      meetingLink: `https://meet.hospital.com/${generateConsultationId().toLowerCase()}`,
      fee: 500
    };
    
    setPatients([...patients, newPatient]);
    setOnlineConsultations([...onlineConsultations, newConsultation]);
    setConsultationData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', doctorId: '', date: '', time: '', requirements: '' });
    setShowBookForm(false);
    window.history.pushState({}, '', '/appointments/online-consultation');
  };

  const filteredConsultations = onlineConsultations.filter(consultation => {
    const matchesSearch = 
      getPatientName(consultation.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorName(consultation.doctorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorSpecialization(consultation.doctorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPatientPhone(consultation.patientId).includes(searchTerm) ||
      consultation.requirements.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || consultation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Online Consultations</h1>
        <button className="btn-primary" onClick={() => setShowBookForm(true)}>
          Book New Consultation
        </button>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{onlineConsultations.length}</span>
          <span className="label">Total Consultations</span>
        </div>
        <div className="stat">
          <span className="number">{onlineConsultations.filter(c => c.status === 'Completed').length}</span>
          <span className="label">Completed</span>
        </div>
        <div className="stat">
          <span className="number">{onlineConsultations.filter(c => c.status === 'Scheduled').length}</span>
          <span className="label">Scheduled</span>
        </div>
        <div className="stat">
          <span className="number">₹{onlineConsultations.filter(c => c.status === 'Completed').reduce((sum, c) => sum + (c.fee || 0), 0)}</span>
          <span className="label">Total Revenue</span>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search consultations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter"
        >
          <option value="All">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date & Time</th>
              <th>Requirements</th>
              <th>Status</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsultations.map(consultation => (
              <tr key={consultation.id}>
                <td>{consultation.id}</td>
                <td>
                  <div>{getPatientName(consultation.patientId)}</div>
                  <small>{getPatientPhone(consultation.patientId)}</small>
                </td>
                <td>
                  <div>{getDoctorName(consultation.doctorId)}</div>
                  <small>{getDoctorSpecialization(consultation.doctorId)}</small>
                </td>
                <td>
                  <div>{consultation.date}</div>
                  <small>{consultation.time}</small>
                </td>
                <td>
                  <div className="requirements-cell">
                    {consultation.requirements.length > 50 
                      ? `${consultation.requirements.substring(0, 50)}...` 
                      : consultation.requirements}
                  </div>
                </td>
                <td>
                  <span className={`status ${consultation.status.toLowerCase()}`}>
                    {consultation.status}
                  </span>
                </td>
                <td>
                  {consultation.status === 'Completed' && consultation.fee ? (
                    <div>
                      <div>₹{consultation.fee}</div>
                      <small>{consultation.paymentMethod} - {consultation.paymentStatus}</small>
                    </div>
                  ) : (
                    consultation.fee ? `₹${consultation.fee}` : '-'
                  )}
                </td>
                <td>
                  <div className="actions">
                    <button className="btn-view" onClick={() => setViewingConsultation(consultation)}>View</button>
                    {consultation.status === 'Scheduled' && (
                      <button className="btn-join" onClick={() => window.open(consultation.meetingLink, '_blank')}>Join</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showBookForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Book Online Consultation</h2>
              <button className="close" onClick={() => setShowBookForm(false)}>&times;</button>
            </div>
            <form onSubmit={handleBookConsultation}>
              <div className="form-row">
                <div className="form-group">
                  <label>Patient Name *</label>
                  <input type="text" value={consultationData.name} onChange={(e) => setConsultationData({...consultationData, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input type="number" value={consultationData.age} onChange={(e) => setConsultationData({...consultationData, age: e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select value={consultationData.gender} onChange={(e) => setConsultationData({...consultationData, gender: e.target.value})}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" value={consultationData.phone} onChange={(e) => setConsultationData({...consultationData, phone: e.target.value})} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Address *</label>
                  <input type="text" value={consultationData.address} onChange={(e) => setConsultationData({...consultationData, address: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select value={consultationData.bloodGroup} onChange={(e) => setConsultationData({...consultationData, bloodGroup: e.target.value})}>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Medical Requirements/Symptoms *</label>
                <textarea 
                  value={consultationData.requirements} 
                  onChange={(e) => setConsultationData({...consultationData, requirements: e.target.value})} 
                  placeholder="Describe your symptoms, medical history, or consultation requirements..."
                  rows="3"
                  required 
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Doctor *</label>
                  <select value={consultationData.doctorId} onChange={(e) => setConsultationData({...consultationData, doctorId: e.target.value})} required>
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input type="date" value={consultationData.date} onChange={(e) => setConsultationData({...consultationData, date: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Time *</label>
                  <input type="time" value={consultationData.time} onChange={(e) => setConsultationData({...consultationData, time: e.target.value})} required />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Book Consultation</button>
                <button type="button" className="btn-secondary" onClick={() => setShowBookForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingConsultation && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Consultation Details</h2>
              <button className="close" onClick={() => setViewingConsultation(null)}>&times;</button>
            </div>
            <div className="view-details">
              <div className="detail-row">
                <label>Consultation ID:</label>
                <span>{viewingConsultation.id}</span>
              </div>
              <div className="detail-row">
                <label>Patient:</label>
                <span>{getPatientName(viewingConsultation.patientId)}</span>
              </div>
              <div className="detail-row">
                <label>Phone:</label>
                <span>{getPatientPhone(viewingConsultation.patientId)}</span>
              </div>
              <div className="detail-row">
                <label>Doctor:</label>
                <span>{getDoctorName(viewingConsultation.doctorId)}</span>
              </div>
              <div className="detail-row">
                <label>Specialization:</label>
                <span>{getDoctorSpecialization(viewingConsultation.doctorId)}</span>
              </div>
              <div className="detail-row">
                <label>Date:</label>
                <span>{viewingConsultation.date}</span>
              </div>
              <div className="detail-row">
                <label>Time:</label>
                <span>{viewingConsultation.time}</span>
              </div>
              <div className="detail-row">
                <label>Status:</label>
                <span className={`status ${viewingConsultation.status.toLowerCase()}`}>{viewingConsultation.status}</span>
              </div>
              <div className="detail-row">
                <label>Requirements:</label>
                <span>{viewingConsultation.requirements}</span>
              </div>
              <div className="detail-row">
                <label>Meeting Link:</label>
                <span><a href={viewingConsultation.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></span>
              </div>
              {viewingConsultation.fee && (
                <>
                  <div className="detail-row">
                    <label>Fee:</label>
                    <span>₹{viewingConsultation.fee}</span>
                  </div>
                  {viewingConsultation.paymentMethod && (
                    <>
                      <div className="detail-row">
                        <label>Payment Method:</label>
                        <span>{viewingConsultation.paymentMethod}</span>
                      </div>
                      <div className="detail-row">
                        <label>Payment Status:</label>
                        <span>{viewingConsultation.paymentStatus}</span>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setViewingConsultation(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineConsultation;