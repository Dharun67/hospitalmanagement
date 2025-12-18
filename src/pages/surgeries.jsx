import { useState, useEffect } from 'react';
import { useOutletContext, Navigate, useLocation } from 'react-router-dom';
import "../styles/appointments.css";

const Surgeries = () => {
    const { user } = useOutletContext();
    const location = useLocation();
                    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const getCurrentView = () => {
        const path = location.pathname;
        if (path === '/surgeries/patient-details') return 'patient-details';
        if (path === '/surgeries/add') return 'add-surgery';
        if (path === '/surgeries/reports') return 'reports';
        return 'main';
    };

    const currentView = getCurrentView();

    const [surgeries, setSurgeries] = useState([
        {
            id: 'SUR001',
            patientId: 'P001',
            surgeonId: 'D001',
            surgeryType: 'Appendectomy',
            date: '2024-01-15',
            time: '09:00',
            duration: '2 hours',
            status: 'Scheduled',
            operatingRoom: 'OR-1',
            anesthesiaType: 'General',
            priority: 'Routine',
            notes: 'Patient fasting required',
            cost: 45000,
            insurance: 'Yes',
            bloodType: 'O+',
            allergies: 'None'
        },
        {
            id: 'SUR002',
            patientId: 'P002',
            surgeonId: 'D002',
            surgeryType: 'Gallbladder Removal',
            date: '2024-01-16',
            time: '14:30',
            duration: '1.5 hours',
            status: 'In Progress',
            operatingRoom: 'OR-2',
            anesthesiaType: 'General',
            priority: 'Urgent',
            notes: 'Laparoscopic procedure',
            cost: 75000,
            insurance: 'Yes',
            bloodType: 'A+',
            allergies: 'Penicillin'
        },
        {
            id: 'SUR003',
            patientId: 'P003',
            surgeonId: 'D003',
            surgeryType: 'Knee Replacement',
            date: '2024-01-14',
            time: '11:00',
            duration: '3 hours',
            status: 'Completed',
            operatingRoom: 'OR-3',
            anesthesiaType: 'Spinal',
            priority: 'Elective',
            notes: 'Post-op physiotherapy required',
            cost: 125000,
            insurance: 'No',
            bloodType: 'B+',
            allergies: 'None'
        },
        {
            id: 'SUR004',
            patientId: 'P004',
            surgeonId: 'D001',
            surgeryType: 'Cataract Surgery',
            date: '2024-01-17',
            time: '10:30',
            duration: '45 minutes',
            status: 'Scheduled',
            operatingRoom: 'OR-4',
            anesthesiaType: 'Local',
            priority: 'Routine',
            notes: 'Right eye procedure',
            cost: 25000,
            insurance: 'Yes',
            bloodType: 'AB+',
            allergies: 'Latex'
        }
    ]);

    const [patients] = useState([
        { id: 'P001', name: 'Rajesh Kumar', phone: '+91 9876543210', age: 45, gender: 'Male' },
        { id: 'P002', name: 'Priya Sharma', phone: '+91 9876543211', age: 38, gender: 'Female' },
        { id: 'P003', name: 'Amit Singh', phone: '+91 9876543212', age: 62, gender: 'Male' },
        { id: 'P004', name: 'Sunita Patel', phone: '+91 9876543213', age: 29, gender: 'Female' }
    ]);

    const [surgeons] = useState([
        { id: 'D001', name: 'Dr. Vikram Mehta', specialization: 'General Surgery' },
        { id: 'D002', name: 'Dr. Kavita Reddy', specialization: 'Laparoscopic Surgery' },
        { id: 'D003', name: 'Dr. Arjun Gupta', specialization: 'Orthopedic Surgery' },
        { id: 'D004', name: 'Dr. Neha Joshi', specialization: 'Cardiac Surgery' }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [editingSurgery, setEditingSurgery] = useState(null);
    const [viewingSurgery, setViewingSurgery] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [formData, setFormData] = useState({
        patientId: '',
        surgeonId: '',
        surgeryType: '',
        date: '',
        time: '',
        duration: '',
        operatingRoom: '',
        anesthesiaType: 'General',
        priority: 'Routine',
        notes: '',
        cost: '',
        insurance: 'No',
        bloodType: '',
        allergies: ''
    });

    const surgeryTypes = [
        'Appendectomy', 'Gallbladder Removal', 'Hernia Repair', 'Knee Replacement',
        'Hip Replacement', 'Cataract Surgery', 'Bypass Surgery', 'Tonsillectomy',
        'Thyroidectomy', 'Mastectomy', 'Prostatectomy', 'Hysterectomy'
    ];

    const operatingRooms = ['OR-1', 'OR-2', 'OR-3', 'OR-4', 'OR-5'];

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedSurgeries;
        if (editingSurgery) {
            updatedSurgeries = surgeries.map(surgery => 
                surgery.id === editingSurgery.id 
                    ? { ...surgery, ...formData, status: surgery.status }
                    : surgery
            );
        } else {
            const newSurgery = {
                id: `SUR${String(surgeries.length + 1).padStart(3, '0')}`,
                ...formData,
                status: 'Scheduled'
            };
            updatedSurgeries = [...surgeries, newSurgery];
        }
        setSurgeries(updatedSurgeries);
        localStorage.setItem('hospitalSurgeries', JSON.stringify(updatedSurgeries));
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            patientId: '',
            surgeonId: '',
            surgeryType: '',
            date: '',
            time: '',
            duration: '',
            operatingRoom: '',
            anesthesiaType: 'General',
            priority: 'Routine',
            notes: '',
            cost: '',
            insurance: 'No',
            bloodType: '',
            allergies: ''
        });
        setShowForm(false);
        setEditingSurgery(null);
    };

    const handleEdit = (surgery) => {
        setFormData({
            patientId: surgery.patientId,
            surgeonId: surgery.surgeonId,
            surgeryType: surgery.surgeryType,
            date: surgery.date,
            time: surgery.time,
            duration: surgery.duration,
            operatingRoom: surgery.operatingRoom,
            anesthesiaType: surgery.anesthesiaType,
            priority: surgery.priority,
            notes: surgery.notes,
            cost: surgery.cost || '',
            insurance: surgery.insurance || 'No',
            bloodType: surgery.bloodType || '',
            allergies: surgery.allergies || ''
        });
        setEditingSurgery(surgery);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this surgery?')) {
            const updatedSurgeries = surgeries.filter(surgery => surgery.id !== id);
            setSurgeries(updatedSurgeries);
            localStorage.setItem('hospitalSurgeries', JSON.stringify(updatedSurgeries));
        }
    };

    const updateStatus = (id, newStatus) => {
        const updatedSurgeries = surgeries.map(surgery => 
            surgery.id === id ? { ...surgery, status: newStatus } : surgery
        );
        setSurgeries(updatedSurgeries);
        localStorage.setItem('hospitalSurgeries', JSON.stringify(updatedSurgeries));
    };

    const getPatientName = (patientId) => {
        const patient = patients.find(p => p.id === patientId);
        return patient ? patient.name : 'Unknown';
    };

    const getSurgeonName = (surgeonId) => {
        const surgeon = surgeons.find(s => s.id === surgeonId);
        return surgeon ? surgeon.name : 'Unknown';
    };

    const filteredSurgeries = surgeries.filter(surgery => {
        const matchesSearch = 
            getPatientName(surgery.patientId).toLowerCase().includes(searchTerm.toLowerCase()) ||
            getSurgeonName(surgery.surgeonId).toLowerCase().includes(searchTerm.toLowerCase()) ||
            surgery.surgeryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surgery.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || surgery.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const renderPatientDetails = () => (
        <div className="appointments-container">
            <div className="appointments-header">
                <h1>Surgery Patient Details</h1>
            </div>
            <div className="appointments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Patient ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Scheduled Surgeries</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => {
                            const patientSurgeries = surgeries.filter(s => s.patientId === patient.id);
                            return (
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.gender}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patientSurgeries.length}</td>
                                    <td>
                                        <button className="btn-view" onClick={() => {
                                            const patientSurgeriesDetails = patientSurgeries.map(s => ({
                                                ...s,
                                                patientName: patient.name,
                                                surgeonName: getSurgeonName(s.surgeonId)
                                            }));
                                            alert(`Surgeries for ${patient.name}:\n${patientSurgeriesDetails.map(s => `${s.surgeryType} - ${s.date} (${s.status})`).join('\n')}`);
                                        }}>View Surgeries</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderAddSurgery = () => (
        <div className="appointments-container">
            <div className="appointments-header">
                <h1>Schedule New Surgery</h1>
            </div>
            <div className="modal" style={{position: 'static', background: 'none'}}>
                <div className="modal-content" style={{margin: '0', maxWidth: '100%', width: '100%'}}>
                    <form onSubmit={handleSubmit}>
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
                                <label>Surgeon *</label>
                                <select value={formData.surgeonId} onChange={(e) => setFormData({...formData, surgeonId: e.target.value})} required>
                                    <option value="">Select Surgeon</option>
                                    {surgeons.map(surgeon => (
                                        <option key={surgeon.id} value={surgeon.id}>{surgeon.name} - {surgeon.specialization}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Surgery Type *</label>
                                <select value={formData.surgeryType} onChange={(e) => setFormData({...formData, surgeryType: e.target.value})} required>
                                    <option value="">Select Surgery Type</option>
                                    {surgeryTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Operating Room *</label>
                                <select value={formData.operatingRoom} onChange={(e) => setFormData({...formData, operatingRoom: e.target.value})} required>
                                    <option value="">Select OR</option>
                                    {operatingRooms.map(room => (
                                        <option key={room} value={room}>{room}</option>
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
                        <div className="form-row">
                            <div className="form-group">
                                <label>Duration *</label>
                                <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 2 hours" required />
                            </div>
                            <div className="form-group">
                                <label>Anesthesia Type</label>
                                <select value={formData.anesthesiaType} onChange={(e) => setFormData({...formData, anesthesiaType: e.target.value})}>
                                    <option value="General">General</option>
                                    <option value="Local">Local</option>
                                    <option value="Spinal">Spinal</option>
                                    <option value="Epidural">Epidural</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Priority</label>
                                <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                                    <option value="Routine">Routine</option>
                                    <option value="Urgent">Urgent</option>
                                    <option value="Emergency">Emergency</option>
                                    <option value="Elective">Elective</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Notes</label>
                            <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Pre-operative instructions, special requirements..."></textarea>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Schedule Surgery</button>
                            <button type="button" className="btn-secondary" onClick={resetForm}>Clear Form</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    const renderPieChart = () => {
        const statusCounts = surgeries.reduce((acc, surgery) => {
            acc[surgery.status] = (acc[surgery.status] || 0) + 1;
            return acc;
        }, {});
        
        const priorityCounts = surgeries.reduce((acc, surgery) => {
            acc[surgery.priority] = (acc[surgery.priority] || 0) + 1;
            return acc;
        }, {});

        return (
            <div className="charts-container">
                <div className="chart-section">
                    <h3>Surgery Status Distribution</h3>
                    <div className="pie-chart">
                        {Object.entries(statusCounts).map(([status, count], index) => {
                            const colors = ['#4CAF50', '#2196F3', '#FF9800', '#F44336'];
                            return (
                                <div key={status} className="chart-item">
                                    <div className="chart-color" style={{backgroundColor: colors[index % colors.length]}}></div>
                                    <span>{status}: {count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="chart-section">
                    <h3>Priority Distribution</h3>
                    <div className="pie-chart">
                        {Object.entries(priorityCounts).map(([priority, count], index) => {
                            const colors = ['#9C27B0', '#FF5722', '#607D8B', '#795548'];
                            return (
                                <div key={priority} className="chart-item">
                                    <div className="chart-color" style={{backgroundColor: colors[index % colors.length]}}></div>
                                    <span>{priority}: {count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderReports = () => (
        <div className="appointments-container">
            <div className="appointments-header">
                <h1>Surgery Reports</h1>
            </div>
            {renderPieChart()}
            <div className="appointments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Surgery ID</th>
                            <th>Patient</th>
                            <th>Surgery Type</th>
                            <th>Date</th>
                            <th>Surgeon</th>
                            <th>Status</th>
                            <th>Duration</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surgeries.filter(s => s.status === 'Completed').map(surgery => (
                            <tr key={surgery.id}>
                                <td>{surgery.id}</td>
                                <td>{getPatientName(surgery.patientId)}</td>
                                <td>{surgery.surgeryType}</td>
                                <td>{surgery.date}</td>
                                <td>{getSurgeonName(surgery.surgeonId)}</td>
                                <td>
                                    <span className={`status ${surgery.status.toLowerCase()}`}>
                                        {surgery.status}
                                    </span>
                                </td>
                                <td>{surgery.duration}</td>
                                <td>
                                    <button className="btn-view" onClick={() => {
                                        setSelectedReport(surgery);
                                        setShowReportModal(true);
                                    }}>View Report</button>
                                    <button className="btn-edit" onClick={() => window.print()}>Print</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showReportModal && selectedReport && (
                <div className="modal">
                    <div className="modal-content" style={{maxWidth: '700px'}}>
                        <div className="modal-header">
                            <h2>Surgery Report - {selectedReport.id}</h2>
                            <button className="close" onClick={() => setShowReportModal(false)}>&times;</button>
                        </div>
                        <div className="report-form">
                            <div className="form-section">
                                <h3>Patient Information</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Patient Name:</label>
                                        <input type="text" value={getPatientName(selectedReport.patientId)} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Surgery ID:</label>
                                        <input type="text" value={selectedReport.id} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <h3>Surgery Details</h3>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Surgery Type:</label>
                                        <input type="text" value={selectedReport.surgeryType} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Surgeon:</label>
                                        <input type="text" value={getSurgeonName(selectedReport.surgeonId)} readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date:</label>
                                        <input type="text" value={selectedReport.date} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Duration:</label>
                                        <input type="text" value={selectedReport.duration} readOnly />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Cost:</label>
                                        <input type="text" value={`₹${selectedReport.cost || 'N/A'}`} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Status:</label>
                                        <input type="text" value={selectedReport.status} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="form-section">
                                <h3>Notes</h3>
                                <div className="form-group">
                                    <textarea value={selectedReport.notes || 'No notes'} readOnly rows="3"></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-primary" onClick={() => window.print()}>Print</button>
                            <button type="button" className="btn-secondary" onClick={() => setShowReportModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderMainView = () => (
        <div className="appointments-container">
            <div className="appointments-header">
                <h1>Surgery Management</h1>
                <button className="btn-primary" onClick={() => setShowForm(true)}>Schedule Surgery</button>
            </div>

            <div className="filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search surgeries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="appointments-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Patient</th>
                            <th>Surgeon</th>
                            <th>Surgery Type</th>
                            <th>Date & Time</th>
                            <th>OR</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSurgeries.map(surgery => (
                            <tr key={surgery.id}>
                                <td>{surgery.id}</td>
                                <td>{getPatientName(surgery.patientId)}</td>
                                <td>{getSurgeonName(surgery.surgeonId)}</td>
                                <td>{surgery.surgeryType}</td>
                                <td>{surgery.date} {surgery.time}</td>
                                <td>{surgery.operatingRoom}</td>
                                <td>
                                    <span className={`priority ${surgery.priority.toLowerCase()}`}>
                                        {surgery.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status ${surgery.status.toLowerCase().replace(' ', '-')}`}>
                                        {surgery.status}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button className="btn-view" onClick={() => setViewingSurgery(surgery)}>View</button>
                                    <button className="btn-edit" onClick={() => handleEdit(surgery)}>Edit</button>
                                    {surgery.status === 'Scheduled' && (
                                        <button className="btn-start" onClick={() => updateStatus(surgery.id, 'In Progress')}>Start</button>
                                    )}
                                    {surgery.status === 'In Progress' && (
                                        <button className="btn-complete" onClick={() => updateStatus(surgery.id, 'Completed')}>Complete</button>
                                    )}
                                    <button className="btn-delete" onClick={() => handleDelete(surgery.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showForm && currentView === 'main' && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingSurgery ? 'Edit Surgery' : 'Schedule Surgery'}</h2>
                            <button className="close" onClick={resetForm}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                    <label>Surgeon *</label>
                                    <select value={formData.surgeonId} onChange={(e) => setFormData({...formData, surgeonId: e.target.value})} required>
                                        <option value="">Select Surgeon</option>
                                        {surgeons.map(surgeon => (
                                            <option key={surgeon.id} value={surgeon.id}>{surgeon.name} - {surgeon.specialization}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Surgery Type *</label>
                                    <select value={formData.surgeryType} onChange={(e) => setFormData({...formData, surgeryType: e.target.value})} required>
                                        <option value="">Select Surgery Type</option>
                                        {surgeryTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Operating Room *</label>
                                    <select value={formData.operatingRoom} onChange={(e) => setFormData({...formData, operatingRoom: e.target.value})} required>
                                        <option value="">Select OR</option>
                                        {operatingRooms.map(room => (
                                            <option key={room} value={room}>{room}</option>
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
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Duration *</label>
                                    <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g., 2 hours" required />
                                </div>
                                <div className="form-group">
                                    <label>Anesthesia Type</label>
                                    <select value={formData.anesthesiaType} onChange={(e) => setFormData({...formData, anesthesiaType: e.target.value})}>
                                        <option value="General">General</option>
                                        <option value="Local">Local</option>
                                        <option value="Spinal">Spinal</option>
                                        <option value="Epidural">Epidural</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                                        <option value="Routine">Routine</option>
                                        <option value="Urgent">Urgent</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Elective">Elective</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Cost (₹)</label>
                                    <input type="number" value={formData.cost} onChange={(e) => setFormData({...formData, cost: e.target.value})} placeholder="Enter cost" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Insurance</label>
                                    <select value={formData.insurance} onChange={(e) => setFormData({...formData, insurance: e.target.value})}>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Blood Type</label>
                                    <select value={formData.bloodType} onChange={(e) => setFormData({...formData, bloodType: e.target.value})}>
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Allergies</label>
                                <input type="text" value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} placeholder="Enter allergies" />
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Pre-operative instructions, special requirements..."></textarea>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">{editingSurgery ? 'Update' : 'Schedule'}</button>
                                <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {viewingSurgery && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Surgery Details</h2>
                            <button className="close" onClick={() => setViewingSurgery(null)}>&times;</button>
                        </div>
                        <div className="view-details">
                            <div className="detail-row">
                                <label>Surgery ID:</label>
                                <span>{viewingSurgery.id}</span>
                            </div>
                            <div className="detail-row">
                                <label>Patient:</label>
                                <span>{getPatientName(viewingSurgery.patientId)}</span>
                            </div>
                            <div className="detail-row">
                                <label>Surgeon:</label>
                                <span>{getSurgeonName(viewingSurgery.surgeonId)}</span>
                            </div>
                            <div className="detail-row">
                                <label>Surgery Type:</label>
                                <span>{viewingSurgery.surgeryType}</span>
                            </div>
                            <div className="detail-row">
                                <label>Date & Time:</label>
                                <span>{viewingSurgery.date} at {viewingSurgery.time}</span>
                            </div>
                            <div className="detail-row">
                                <label>Duration:</label>
                                <span>{viewingSurgery.duration}</span>
                            </div>
                            <div className="detail-row">
                                <label>Operating Room:</label>
                                <span>{viewingSurgery.operatingRoom}</span>
                            </div>
                            <div className="detail-row">
                                <label>Anesthesia Type:</label>
                                <span>{viewingSurgery.anesthesiaType}</span>
                            </div>
                            <div className="detail-row">
                                <label>Priority:</label>
                                <span className={`priority ${viewingSurgery.priority.toLowerCase()}`}>{viewingSurgery.priority}</span>
                            </div>
                            <div className="detail-row">
                                <label>Status:</label>
                                <span className={`status ${viewingSurgery.status.toLowerCase().replace(' ', '-')}`}>{viewingSurgery.status}</span>
                            </div>
                            <div className="detail-row">
                                <label>Cost:</label>
                                <span>₹{viewingSurgery.cost || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <label>Insurance:</label>
                                <span>{viewingSurgery.insurance || 'No'}</span>
                            </div>
                            <div className="detail-row">
                                <label>Blood Type:</label>
                                <span>{viewingSurgery.bloodType || 'N/A'}</span>
                            </div>
                            <div className="detail-row">
                                <label>Allergies:</label>
                                <span>{viewingSurgery.allergies || 'None'}</span>
                            </div>
                            {viewingSurgery.notes && (
                                <div className="detail-row">
                                    <label>Notes:</label>
                                    <span>{viewingSurgery.notes}</span>
                                </div>
                            )}
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={() => setViewingSurgery(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {currentView === 'patient-details' && renderPatientDetails()}
            {currentView === 'add-surgery' && renderAddSurgery()}
            {currentView === 'reports' && renderReports()}
            {currentView === 'main' && renderMainView()}
        </>
    );
};

export default Surgeries;