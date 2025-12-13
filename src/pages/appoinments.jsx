import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [onlineConsultations, setOnlineConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showBookForm, setShowBookForm] = useState(false);
  const [showManageMode, setShowManageMode] = useState(false);
  const [viewingAppointment, setViewingAppointment] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({ fee: '', paymentMethod: 'Cash' });
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    status: 'Scheduled',
    date: '',
    time: ''
  });
  const [bookingData, setBookingData] = useState({
    name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+',
    doctorId: '', date: '', time: ''
  });

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/appointments/book') {
      setShowBookForm(true);
      setShowManageMode(false);
    } else if (location.pathname === '/appointments/manage') {
      setShowManageMode(true);
      setShowBookForm(false);
    } else {
      setShowBookForm(false);
      setShowManageMode(false);
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      
      
      const savedPatients = localStorage.getItem('hospitalPatients');
      const savedAppointments = localStorage.getItem('hospitalAppointments');
      
      setAppointments(savedAppointments ? JSON.parse(savedAppointments) : data.appointments);
      setDoctors(data.doctors);
      setPatients(savedPatients ? JSON.parse(savedPatients) : data.patients);
      setOnlineConsultations(data.onlineConsultations || []);
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

  const generateId = () => {
    const lastId = appointments[appointments.length - 1]?.id || 'APT900';
    const num = parseInt(lastId.replace('APT', '')) + 1;
    return `APT${num}`;
  };

  const generatePatientId = () => {
    const lastId = patients[patients.length - 1]?.id || 'PAT500';
    const num = parseInt(lastId.replace('PAT', '')) + 1;
    return `PAT${num}`;
  };

  const handleBookAppointment = (e) => {
    e.preventDefault();
    
    const newPatient = {
      id: generatePatientId(),
      name: bookingData.name,
      age: bookingData.age,
      gender: bookingData.gender,
      phone: bookingData.phone,
      address: bookingData.address,
      bloodGroup: bookingData.bloodGroup,
      admitted: false,
      visitDate: new Date().toISOString().split('T')[0]
    };
    
    const newAppointment = {
      id: generateId(),
      patientId: newPatient.id,
      doctorId: bookingData.doctorId,
      date: bookingData.date,
      time: bookingData.time,
      status: 'Scheduled'
    };
    
    const updatedPatients = [...patients, newPatient];
    const updatedAppointments = [...appointments, newAppointment];
    
    setPatients(updatedPatients);
    setAppointments(updatedAppointments);
    
    // Save to localStorage for cross-page sync
    localStorage.setItem('hospitalPatients', JSON.stringify(updatedPatients));
    localStorage.setItem('hospitalAppointments', JSON.stringify(updatedAppointments));
    
    setBookingData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', doctorId: '', date: '', time: '' });
    setShowBookForm(false);
    window.history.pushState({}, '', '/appointments');
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment.id);
    setFormData({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      status: appointment.status,
      date: appointment.date,
      time: appointment.time
    });
  };

  const handleUpdateAppointment = (e) => {
    e.preventDefault();
    
    if (formData.status === 'Completed') {
      setShowPaymentForm(true);
      return;
    }
    
    setAppointments(appointments.map(apt => 
      apt.id === editingAppointment ? { ...apt, ...formData } : apt
    ));
    setEditingAppointment(null);
    setFormData({ patientId: '', doctorId: '', status: 'Scheduled', date: '', time: '' });
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setAppointments(appointments.map(apt => 
      apt.id === editingAppointment ? { 
        ...apt, 
        status: 'Completed',
        fee: parseInt(paymentData.fee),
        paymentMethod: paymentData.paymentMethod,
        paymentStatus: 'Paid' 
      } : apt
    ));
    setEditingAppointment(null);
    setShowPaymentForm(false);
    setPaymentData({ fee: '', paymentMethod: 'Cash' });
  };

  const handleMarkCompleted = (appointmentId) => {
    setEditingAppointment(appointmentId);
    setPaymentData({ fee: '', paymentMethod: 'Cash' });
    setShowPaymentForm(true);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Delete this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      getPatientName(appointment.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorName(appointment.doctorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorSpecialization(appointment.doctorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPatientPhone(appointment.patientId).includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredConsultations = onlineConsultations.filter(consultation => {
    const matchesSearch = 
      getPatientName(consultation.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorName(consultation.doctorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getDoctorSpecialization(consultation.doctorId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPatientPhone(consultation.patientId).includes(searchTerm) ||
      (consultation.requirements && consultation.requirements.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || consultation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Appointments {showManageMode ? '- Manage Mode' : showBookForm ? '- Book New' : ''}</h1>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{appointments.length + onlineConsultations.length}</span>
          <span className="label">Total</span>
        </div>
        <div className="stat">
          <span className="number">{appointments.length}</span>
          <span className="label">Appointments</span>
        </div>
        <div className="stat">
          <span className="number">{onlineConsultations.length}</span>
          <span className="label">Consultations</span>
        </div>
        <div className="stat">
          <span className="number">{appointments.filter(a => a.status === 'Completed').length + onlineConsultations.filter(c => c.status === 'Completed').length}</span>
          <span className="label">Completed</span>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search appointments..."
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
          <option value="Completed">Completed</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Pending">Pending</option>
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
              <th>Type</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appointment => (
              <tr key={appointment.id}>
                <td>{appointment.id}</td>
                <td>
                  <div>{getPatientName(appointment.patientId)}</div>
                  <small>{getPatientPhone(appointment.patientId)}</small>
                </td>
                <td>
                  <div>{getDoctorName(appointment.doctorId)}</div>
                  <small>{getDoctorSpecialization(appointment.doctorId)}</small>
                </td>
                <td>
                  <div>{appointment.date}</div>
                  <small>{appointment.time}</small>
                </td>
                <td>In-Person</td>
                <td>
                  <span className={`status ${appointment.status.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  {appointment.status === 'Completed' && appointment.fee ? (
                    <div>
                      <div>₹{appointment.fee}</div>
                      <small>{appointment.paymentMethod} - {appointment.paymentStatus}</small>
                    </div>
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  <div className="actions">
                    <button className="btn-view" onClick={() => setViewingAppointment(appointment)}>View</button>
                    {appointment.status !== 'Completed' && appointment.status !== 'Cancelled' && (
                      <button className="btn-complete" onClick={() => handleMarkCompleted(appointment.id)}>Complete</button>
                    )}
                    {showManageMode && (
                      <>
                        <button className="btn-edit" onClick={() => handleEditAppointment(appointment)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDeleteAppointment(appointment.id)}>Delete</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
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
                <td>Online</td>
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
                    <button className="btn-view" onClick={() => setViewingAppointment({...consultation, type: 'online'})}>View</button>
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

      {(editingAppointment || showBookForm) && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingAppointment ? 'Edit Appointment' : 'Book New Appointment'}</h2>
              <button className="close" onClick={() => {
                setEditingAppointment(null);
                setShowBookForm(false);
                setFormData({ patientId: '', doctorId: '', status: 'Scheduled', date: '', time: '' });
              }}>&times;</button>
            </div>
            <form onSubmit={editingAppointment ? handleUpdateAppointment : handleBookAppointment}>
              {!editingAppointment ? (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Patient Name *</label>
                      <input type="text" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Age *</label>
                      <input type="number" value={bookingData.age} onChange={(e) => setBookingData({...bookingData, age: e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Gender</label>
                      <select value={bookingData.gender} onChange={(e) => setBookingData({...bookingData, gender: e.target.value})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input type="tel" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Address *</label>
                      <input type="text" value={bookingData.address} onChange={(e) => setBookingData({...bookingData, address: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Blood Group</label>
                      <select value={bookingData.bloodGroup} onChange={(e) => setBookingData({...bookingData, bloodGroup: e.target.value})}>
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
                  <div className="form-row">
                    <div className="form-group">
                      <label>Doctor *</label>
                      <select value={bookingData.doctorId} onChange={(e) => setBookingData({...bookingData, doctorId: e.target.value})} required>
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
                      <input type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Time *</label>
                      <input type="time" value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} required />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Patient *</label>
                      <select value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} required>
                        <option value="">Select Patient</option>
                        {patients.map(patient => (
                          <option key={patient.id} value={patient.id}>{patient.name} - {patient.phone}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Doctor *</label>
                      <select value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} required>
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
                      <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
                    </div>
                    <div className="form-group">
                      <label>Time *</label>
                      <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingAppointment ? 'Update' : 'Book'}</button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setEditingAppointment(null);
                  setShowBookForm(false);
                  setBookingData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', doctorId: '', date: '', time: '' });
                  setFormData({ patientId: '', doctorId: '', status: 'Scheduled', date: '', time: '' });
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Complete Appointment</h2>
              <button className="close" onClick={() => {
                setShowPaymentForm(false);
                setEditingAppointment(null);
                setPaymentData({ fee: '', paymentMethod: 'Cash' });
              }}>&times;</button>
            </div>
            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label>Fee Amount *</label>
                <input 
                  type="number" 
                  value={paymentData.fee} 
                  onChange={(e) => setPaymentData({...paymentData, fee: e.target.value})} 
                  placeholder="Enter consultation fee"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Payment Method</label>
                <select value={paymentData.paymentMethod} onChange={(e) => setPaymentData({...paymentData, paymentMethod: e.target.value})}>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">Complete</button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setShowPaymentForm(false);
                  setEditingAppointment(null);
                  setPaymentData({ fee: '', paymentMethod: 'Cash' });
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingAppointment && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Appointment Details</h2>
              <button className="close" onClick={() => setViewingAppointment(null)}>&times;</button>
            </div>
            <div className="view-details">
              <div className="detail-row">
                <label>ID:</label>
                <span>{viewingAppointment.id}</span>
              </div>
              <div className="detail-row">
                <label>Patient:</label>
                <span>{getPatientName(viewingAppointment.patientId)}</span>
              </div>
              <div className="detail-row">
                <label>Phone:</label>
                <span>{getPatientPhone(viewingAppointment.patientId)}</span>
              </div>
              <div className="detail-row">
                <label>Doctor:</label>
                <span>{getDoctorName(viewingAppointment.doctorId)}</span>
              </div>
              <div className="detail-row">
                <label>Specialization:</label>
                <span>{getDoctorSpecialization(viewingAppointment.doctorId)}</span>
              </div>
              <div className="detail-row">
                <label>Date:</label>
                <span>{viewingAppointment.date}</span>
              </div>
              <div className="detail-row">
                <label>Time:</label>
                <span>{viewingAppointment.time}</span>
              </div>
              <div className="detail-row">
                <label>Type:</label>
                <span>{viewingAppointment.type === 'online' ? 'Online Consultation' : 'In-Person Appointment'}</span>
              </div>
              <div className="detail-row">
                <label>Status:</label>
                <span className={`status ${viewingAppointment.status.toLowerCase()}`}>{viewingAppointment.status}</span>
              </div>
              {viewingAppointment.requirements && (
                <div className="detail-row">
                  <label>Requirements:</label>
                  <span>{viewingAppointment.requirements}</span>
                </div>
              )}
              {viewingAppointment.meetingLink && (
                <div className="detail-row">
                  <label>Meeting Link:</label>
                  <span><a href={viewingAppointment.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></span>
                </div>
              )}
              {viewingAppointment.fee && (
                <>
                  <div className="detail-row">
                    <label>Fee:</label>
                    <span>₹{viewingAppointment.fee}</span>
                  </div>
                  <div className="detail-row">
                    <label>Payment Method:</label>
                    <span>{viewingAppointment.paymentMethod}</span>
                  </div>
                  <div className="detail-row">
                    <label>Payment Status:</label>
                    <span>{viewingAppointment.paymentStatus}</span>
                  </div>
                </>
              )}
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setViewingAppointment(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;