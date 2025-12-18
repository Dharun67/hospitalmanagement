import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/appointments.css';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetailsMode, setShowDetailsMode] = useState(false);
  const [showOutpatients, setShowOutpatients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientData, setPatientData] = useState({
    name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', admitted: false
  });
  const [viewingPatient, setViewingPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/patients/add') {
      setShowAddForm(true);
      setShowDetailsMode(false);
      setShowOutpatients(false);
    } else if (location.pathname === '/patients/details') {
      setShowDetailsMode(true);
      setShowAddForm(false);
      setShowOutpatients(false);
    } else if (location.pathname === '/patients/outpatients') {
      setShowOutpatients(true);
      setShowAddForm(false);
      setShowDetailsMode(false);
    } else {
      setShowAddForm(false);
      setShowDetailsMode(false);
      setShowOutpatients(false);
    }
  }, [location.pathname]);

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      
      // Load from localStorage if available, otherwise use JSON data
      const savedPatients = localStorage.getItem('hospitalPatients');
      setPatients(savedPatients ? JSON.parse(savedPatients) : data.patients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const generatePatientId = () => {
    const lastId = patients[patients.length - 1]?.id || 'PAT500';
    const num = parseInt(lastId.replace('PAT', '')) + 1;
    return `PAT${num}`;
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: generatePatientId(),
      ...patientData,
      visitDate: new Date().toISOString().split('T')[0]
    };
    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    
    // Save to localStorage for cross-page sync
    localStorage.setItem('hospitalPatients', JSON.stringify(updatedPatients));
    
    setPatientData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', admitted: false });
    setShowAddForm(false);
    window.history.pushState({}, '', '/patients');
  };

  const handleDeletePatient = (id) => {
    if (window.confirm('Delete this patient?')) {
      const updatedPatients = patients.filter(p => p.id !== id);
      setPatients(updatedPatients);
      
      // Save to localStorage for cross-page sync
      localStorage.setItem('hospitalPatients', JSON.stringify(updatedPatients));
    }
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient.id);
    setPatientData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      address: patient.address,
      bloodGroup: patient.bloodGroup,
      admitted: patient.admitted
    });
  };

  const handleUpdatePatient = (e) => {
    e.preventDefault();
    const updatedPatients = patients.map(p => 
      p.id === editingPatient ? { ...p, ...patientData } : p
    );
    setPatients(updatedPatients);
    
    // Save to localStorage for cross-page sync
    localStorage.setItem('hospitalPatients', JSON.stringify(updatedPatients));
    
    setEditingPatient(null);
    setPatientData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', admitted: false });
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const outpatients = patients.filter(patient => !patient.admitted);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>Patients {showAddForm ? '- Add New' : showDetailsMode ? '- Details' : showOutpatients ? '- Outpatients' : ''}</h1>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{patients.length}</span>
          <span className="label">Total Patients</span>
        </div>
        <div className="stat">
          <span className="number">{patients.filter(p => p.admitted).length}</span>
          <span className="label">Admitted</span>
        </div>
        <div className="stat">
          <span className="number">{outpatients.length}</span>
          <span className="label">Outpatients</span>
        </div>
        <div className="stat">
          <span className="number">{patients.filter(p => p.visitDate === new Date().toISOString().split('T')[0]).length}</span>
          <span className="label">Today's Visits</span>
        </div>
      </div>

      {!showAddForm && (
        <div className="controls">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search"
          />
        </div>
      )}

      {!showAddForm && (
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Visit Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(showOutpatients ? outpatients : filteredPatients).map(patient => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.bloodGroup}</td>
                  <td>
                    <span className={`status ${patient.admitted ? 'confirmed' : 'pending'}`}>
                      {patient.admitted ? 'Admitted' : 'Outpatient'}
                    </span>
                  </td>
                  <td>{patient.visitDate}</td>
                  <td>
                    <button className="btn-view" onClick={() => setViewingPatient(patient)}>View</button>
                    <button className="btn-edit" onClick={() => handleEditPatient(patient)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(showAddForm || editingPatient) && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button className="close" onClick={() => {
                setShowAddForm(false);
                setEditingPatient(null);
                setPatientData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', admitted: false });
                if (showAddForm) window.history.pushState({}, '', '/patients');
              }}>&times;</button>
            </div>
            <form onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input 
                    type="text" 
                    value={patientData.name} 
                    onChange={(e) => setPatientData({...patientData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input 
                    type="number" 
                    value={patientData.age} 
                    onChange={(e) => setPatientData({...patientData, age: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <select value={patientData.gender} onChange={(e) => setPatientData({...patientData, gender: e.target.value})}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input 
                    type="tel" 
                    value={patientData.phone} 
                    onChange={(e) => setPatientData({...patientData, phone: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Address *</label>
                  <input 
                    type="text" 
                    value={patientData.address} 
                    onChange={(e) => setPatientData({...patientData, address: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Blood Group</label>
                  <select value={patientData.bloodGroup} onChange={(e) => setPatientData({...patientData, bloodGroup: e.target.value})}>
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
                  <label>Patient Type</label>
                  <select value={patientData.admitted} onChange={(e) => setPatientData({...patientData, admitted: e.target.value === 'true'})}>
                    <option value={false}>Outpatient</option>
                    <option value={true}>Admitted</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingPatient ? 'Update Patient' : 'Add Patient'}</button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setShowAddForm(false);
                  setEditingPatient(null);
                  setPatientData({ name: '', age: '', gender: 'Male', phone: '', address: '', bloodGroup: 'O+', admitted: false });
                  if (showAddForm) window.history.pushState({}, '', '/patients');
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingPatient && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Patient Details</h2>
              <button className="close" onClick={() => setViewingPatient(null)}>&times;</button>
            </div>
            <div className="patient-details">
              <div className="detail-row">
                <strong>ID:</strong> {viewingPatient.id}
              </div>
              <div className="detail-row">
                <strong>Name:</strong> {viewingPatient.name}
              </div>
              <div className="detail-row">
                <strong>Age:</strong> {viewingPatient.age}
              </div>
              <div className="detail-row">
                <strong>Gender:</strong> {viewingPatient.gender}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {viewingPatient.phone}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {viewingPatient.address}
              </div>
              <div className="detail-row">
                <strong>Blood Group:</strong> {viewingPatient.bloodGroup}
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`status ${viewingPatient.admitted ? 'confirmed' : 'pending'}`}>
                  {viewingPatient.admitted ? 'Admitted' : 'Outpatient'}
                </span>
              </div>
              <div className="detail-row">
                <strong>Visit Date:</strong> {viewingPatient.visitDate}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-delete" onClick={() => {
                handleDeletePatient(viewingPatient.id);
                setViewingPatient(null);
              }}>Delete Patient</button>
              <button className="btn-secondary" onClick={() => setViewingPatient(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;