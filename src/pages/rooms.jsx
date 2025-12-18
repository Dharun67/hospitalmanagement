import { useState, useEffect } from 'react';
import { useOutletContext, Navigate, useLocation } from 'react-router-dom';
import "../styles/appointments.css";

const Rooms = () => {
    const { user } = useOutletContext();
    const location = useLocation();
    
    const [rooms, setRooms] = useState([]);
    const [patients, setPatients] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [viewingRoom, setViewingRoom] = useState(null);
    const [allocatingRoom, setAllocatingRoom] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [formData, setFormData] = useState({
        roomNumber: '',
        bedNumber: '',
        type: 'General',
        capacity: 1,
        patientId: '',
        admissionDate: '',
        condition: '',
        equipment: '',
        nurseAssigned: '',
        dailyRate: 1500
    });

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const getCurrentView = () => {
        const path = location.pathname;
        if (path === '/rooms/icu-details') return 'icu';
        if (path === '/rooms/emergency-ward') return 'emergency';
        if (path === '/rooms/general-ward') return 'general';
        return 'main';
    };

    const currentView = getCurrentView();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const savedRooms = localStorage.getItem('hospitalRooms');
            const savedPatients = localStorage.getItem('hospitalPatients');
            const savedStaff = localStorage.getItem('hospitalStaff');
            
            const defaultRooms = [
                // ICU Rooms - Critical Cases
                {
                    id: 'R001',
                    roomNumber: 'ICU-101',
                    bedNumber: 'B101-1',
                    type: 'ICU',
                    capacity: 1,
                    occupied: true,
                    patientId: 'P001',
                    patientName: 'Rajesh Kumar',
                    admissionDate: '2024-01-10',
                    condition: 'Severe Road Accident - Multiple Fractures',
                    equipment: 'Ventilator, Heart Monitor, Defibrillator',
                    nurseAssigned: 'Nurse Priya Sharma',
                    dailyRate: 8000,
                    status: 'Occupied'
                },
                {
                    id: 'R002',
                    roomNumber: 'ICU-102',
                    bedNumber: 'B102-1',
                    type: 'ICU',
                    capacity: 1,
                    occupied: true,
                    patientId: 'P009',
                    patientName: 'Mohan Singh',
                    admissionDate: '2024-01-18',
                    condition: 'Heart Attack - Post Cardiac Surgery',
                    equipment: 'Ventilator, Heart Monitor, Defibrillator',
                    nurseAssigned: 'Nurse Deepika Rao',
                    dailyRate: 8000,
                    status: 'Occupied'
                },
                {
                    id: 'R003',
                    roomNumber: 'ICU-103',
                    bedNumber: 'B103-1',
                    type: 'ICU',
                    capacity: 1,
                    occupied: true,
                    patientId: 'P010',
                    patientName: 'Sushma Devi',
                    admissionDate: '2024-01-19',
                    condition: 'Severe Pneumonia - Respiratory Failure',
                    equipment: 'Ventilator, Heart Monitor, Oxygen Support',
                    nurseAssigned: 'Nurse Anjali Gupta',
                    dailyRate: 8000,
                    status: 'Occupied'
                },
                {
                    id: 'R004A',
                    roomNumber: 'ICU-104',
                    bedNumber: 'B104-1',
                    type: 'ICU',
                    capacity: 1,
                    occupied: false,
                    patientId: '',
                    patientName: '',
                    admissionDate: '',
                    condition: '',
                    equipment: 'Ventilator, Heart Monitor',
                    nurseAssigned: '',
                    dailyRate: 8000,
                    status: 'Maintenance'
                },
                // Emergency Rooms - Urgent Cases
                {
                    id: 'R005',
                    roomNumber: 'ER-201',
                    bedNumber: 'B201-1',
                    type: 'Emergency',
                    capacity: 2,
                    occupied: true,
                    patientId: 'P002',
                    patientName: 'Priya Sharma',
                    admissionDate: '2024-01-15',
                    condition: 'Bike Accident - Head Injury',
                    equipment: 'Oxygen Support, X-Ray Machine, CT Scanner',
                    nurseAssigned: 'Nurse Kavita Singh',
                    dailyRate: 4500,
                    status: 'Occupied'
                },
                {
                    id: 'R006',
                    roomNumber: 'ER-202',
                    bedNumber: 'B202-1',
                    type: 'Emergency',
                    capacity: 2,
                    occupied: true,
                    patientId: 'P004',
                    patientName: 'Suresh Gupta',
                    admissionDate: '2024-01-16',
                    condition: 'Food Poisoning - Severe Dehydration',
                    equipment: 'IV Drip, ECG Monitor, Oxygen Support',
                    nurseAssigned: 'Nurse Meera Joshi',
                    dailyRate: 4500,
                    status: 'Occupied'
                },
                {
                    id: 'R007',
                    roomNumber: 'ER-203',
                    bedNumber: 'B203-1',
                    type: 'Emergency',
                    capacity: 2,
                    occupied: true,
                    patientId: 'P011',
                    patientName: 'Ravi Kumar',
                    admissionDate: '2024-01-20',
                    condition: 'High Fever - Dengue Suspected',
                    equipment: 'Temperature Monitor, IV Drip',
                    nurseAssigned: 'Nurse Shanti Nair',
                    dailyRate: 4500,
                    status: 'Occupied'
                },
                {
                    id: 'R008',
                    roomNumber: 'ER-204',
                    bedNumber: 'B204-1',
                    type: 'Emergency',
                    capacity: 2,
                    occupied: true,
                    patientId: 'P012',
                    patientName: 'Geeta Rani',
                    admissionDate: '2024-01-21',
                    condition: 'Chest Pain - Cardiac Evaluation',
                    equipment: 'ECG Monitor, Defibrillator, Oxygen',
                    nurseAssigned: 'Nurse Radha Kumari',
                    dailyRate: 4500,
                    status: 'Occupied'
                },
                {
                    id: 'R009',
                    roomNumber: 'ER-205',
                    bedNumber: 'B205-1',
                    type: 'Emergency',
                    capacity: 2,
                    occupied: false,
                    patientId: '',
                    patientName: '',
                    admissionDate: '',
                    condition: '',
                    equipment: 'Basic Monitoring Equipment',
                    nurseAssigned: '',
                    dailyRate: 4500,
                    status: 'Available'
                },
                // General Rooms - Common Cases
                {
                    id: 'R010',
                    roomNumber: 'GW-301',
                    bedNumber: 'B301-1',
                    type: 'General',
                    capacity: 4,
                    occupied: true,
                    patientId: 'P003',
                    patientName: 'Amit Patel',
                    admissionDate: '2024-01-12',
                    condition: 'Post Surgery Recovery - Appendectomy',
                    equipment: 'Basic Care Equipment, Pain Management',
                    nurseAssigned: 'Nurse Sunita Rao',
                    dailyRate: 2500,
                    status: 'Occupied'
                },
                {
                    id: 'R011',
                    roomNumber: 'GW-302',
                    bedNumber: 'B302-1',
                    type: 'General',
                    capacity: 4,
                    occupied: true,
                    patientId: 'P005',
                    patientName: 'Anita Verma',
                    admissionDate: '2024-01-14',
                    condition: 'Viral Fever - Under Observation',
                    equipment: 'Temperature Monitor, IV Drip',
                    nurseAssigned: 'Nurse Rekha Nair',
                    dailyRate: 2500,
                    status: 'Occupied'
                },
                {
                    id: 'R012',
                    roomNumber: 'GW-303',
                    bedNumber: 'B303-1',
                    type: 'General',
                    capacity: 4,
                    occupied: true,
                    patientId: 'P013',
                    patientName: 'Ramesh Yadav',
                    admissionDate: '2024-01-17',
                    condition: 'Stomach Infection - Food Poisoning',
                    equipment: 'IV Drip, Basic Monitoring',
                    nurseAssigned: 'Nurse Mamta Singh',
                    dailyRate: 2500,
                    status: 'Occupied'
                },
                {
                    id: 'R013',
                    roomNumber: 'GW-304',
                    bedNumber: 'B304-1',
                    type: 'General',
                    capacity: 4,
                    occupied: true,
                    patientId: 'P014',
                    patientName: 'Kiran Devi',
                    admissionDate: '2024-01-18',
                    condition: 'Typhoid Fever - Treatment in Progress',
                    equipment: 'IV Antibiotics, Temperature Monitor',
                    nurseAssigned: 'Nurse Usha Sharma',
                    dailyRate: 2500,
                    status: 'Occupied'
                },
                {
                    id: 'R014',
                    roomNumber: 'GW-305',
                    bedNumber: 'B305-1',
                    type: 'General',
                    capacity: 4,
                    occupied: true,
                    patientId: 'P015',
                    patientName: 'Sunil Kumar',
                    admissionDate: '2024-01-19',
                    condition: 'Malaria - Recovery Phase',
                    equipment: 'Anti-malarial IV, Basic Care',
                    nurseAssigned: 'Nurse Bharti Jain',
                    dailyRate: 2500,
                    status: 'Occupied'
                },
                {
                    id: 'R015',
                    roomNumber: 'GW-306',
                    bedNumber: 'B306-1',
                    type: 'General',
                    capacity: 4,
                    occupied: false,
                    patientId: '',
                    patientName: '',
                    admissionDate: '',
                    condition: '',
                    equipment: 'Basic Care Equipment',
                    nurseAssigned: '',
                    dailyRate: 2500,
                    status: 'Available'
                },
                // Private Rooms
                {
                    id: 'R016',
                    roomNumber: 'PVT-401',
                    bedNumber: 'B401-1',
                    type: 'Private',
                    capacity: 1,
                    occupied: true,
                    patientId: 'P006',
                    patientName: 'Dr. Ramesh Khanna',
                    admissionDate: '2024-01-13',
                    condition: 'Hypertension Management - Executive Checkup',
                    equipment: 'Premium Care Package, TV, AC, WiFi',
                    nurseAssigned: 'Nurse Pooja Mehta',
                    dailyRate: 6000,
                    status: 'Occupied'
                },
                {
                    id: 'R017',
                    roomNumber: 'PVT-402',
                    bedNumber: 'B402-1',
                    type: 'Private',
                    capacity: 1,
                    occupied: false,
                    patientId: '',
                    patientName: '',
                    admissionDate: '',
                    condition: '',
                    equipment: 'Premium Care Package, TV, AC, WiFi',
                    nurseAssigned: '',
                    dailyRate: 6000,
                    status: 'Available'
                },
                // Maternity Rooms
                {
                    id: 'R018',
                    roomNumber: 'MAT-501',
                    bedNumber: 'B501-1',
                    type: 'Maternity',
                    capacity: 2,
                    occupied: true,
                    patientId: 'P007',
                    patientName: 'Sita Devi',
                    admissionDate: '2024-01-17',
                    condition: 'Normal Delivery - 38 Weeks Pregnant',
                    equipment: 'Delivery Bed, Fetal Monitor, Incubator',
                    nurseAssigned: 'Nurse Lakshmi Iyer',
                    dailyRate: 3500,
                    status: 'Occupied'
                },
                {
                    id: 'R019',
                    roomNumber: 'MAT-502',
                    bedNumber: 'B502-1',
                    type: 'Maternity',
                    capacity: 2,
                    occupied: false,
                    patientId: '',
                    patientName: '',
                    admissionDate: '',
                    condition: '',
                    equipment: 'Delivery Bed, Fetal Monitor, Incubator',
                    nurseAssigned: '',
                    dailyRate: 3500,
                    status: 'Available'
                },
                // Pediatric Rooms
                {
                    id: 'R020',
                    roomNumber: 'PED-601',
                    bedNumber: 'B601-1',
                    type: 'Pediatric',
                    capacity: 3,
                    occupied: true,
                    patientId: 'P008',
                    patientName: 'Rahul Sharma (Age 8)',
                    admissionDate: '2024-01-16',
                    condition: 'Chicken Pox - Isolation Required',
                    equipment: 'Pediatric Monitors, Toys, Isolation Setup',
                    nurseAssigned: 'Nurse Kavya Reddy',
                    dailyRate: 3000,
                    status: 'Occupied'
                },
                {
                    id: 'R021',
                    roomNumber: 'PED-602',
                    bedNumber: 'B602-1',
                    type: 'Pediatric',
                    capacity: 3,
                    occupied: false,
                    patientId: '',
                    patientName: '',
                    admissionDate: '',
                    condition: '',
                    equipment: 'Pediatric Monitors, Toys, Colorful Decor',
                    nurseAssigned: '',
                    dailyRate: 3000,
                    status: 'Available'
                }
            ];

            const defaultNurses = [
                { id: 'N001', name: 'Nurse Priya', shift: 'Day', department: 'ICU' },
                { id: 'N002', name: 'Nurse Kavita', shift: 'Night', department: 'Emergency' },
                { id: 'N003', name: 'Nurse Sunita', shift: 'Day', department: 'General' }
            ];
            
            setRooms(savedRooms ? JSON.parse(savedRooms) : defaultRooms);
            setPatients(savedPatients ? JSON.parse(savedPatients) : []);
            setNurses(savedStaff ? JSON.parse(savedStaff).filter(s => s.role === 'Nurse') : defaultNurses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedRooms;
        if (editingRoom) {
            updatedRooms = rooms.map(room => 
                room.id === editingRoom.id 
                    ? { 
                        ...room, 
                        ...formData, 
                        occupied: formData.patientId ? true : false,
                        patientName: formData.patientId ? getPatientName(formData.patientId) : '',
                        status: formData.patientId ? 'Occupied' : 'Available'
                    }
                    : room
            );
        } else {
            const newRoom = {
                id: `R${String(rooms.length + 1).padStart(3, '0')}`,
                ...formData,
                occupied: formData.patientId ? true : false,
                patientName: formData.patientId ? getPatientName(formData.patientId) : '',
                status: formData.patientId ? 'Occupied' : 'Available'
            };
            updatedRooms = [...rooms, newRoom];
        }
        setRooms(updatedRooms);
        localStorage.setItem('hospitalRooms', JSON.stringify(updatedRooms));
        resetForm();
    };

    const resetForm = () => {
        const defaultType = currentView === 'icu' ? 'ICU' : 
                           currentView === 'emergency' ? 'Emergency' : 
                           currentView === 'general' ? 'General' : 'General';
        
        setFormData({
            roomNumber: '',
            bedNumber: '',
            type: defaultType,
            capacity: 1,
            patientId: '',
            admissionDate: '',
            condition: '',
            equipment: '',
            nurseAssigned: '',
            dailyRate: currentView === 'icu' ? 5000 : currentView === 'emergency' ? 3000 : 1500
        });
        setShowForm(false);
        setEditingRoom(null);
        setAllocatingRoom(null);
    };

    const handleEdit = (room) => {
        setFormData({
            roomNumber: room.roomNumber,
            bedNumber: room.bedNumber || '',
            type: room.type,
            capacity: room.capacity,
            patientId: room.patientId || '',
            admissionDate: room.admissionDate || '',
            condition: room.condition || '',
            equipment: room.equipment || '',
            nurseAssigned: room.nurseAssigned || '',
            dailyRate: room.dailyRate
        });
        setEditingRoom(room);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        const room = rooms.find(r => r.id === id);
        const message = room?.patientName 
            ? `Room ${room.roomNumber} is occupied by ${room.patientName}. Are you sure you want to delete?`
            : `Are you sure you want to delete Room ${room?.roomNumber}?`;
        
        if (window.confirm(message)) {
            const updatedRooms = rooms.filter(room => room.id !== id);
            setRooms(updatedRooms);
            localStorage.setItem('hospitalRooms', JSON.stringify(updatedRooms));
        }
    };

    const getPatientName = (patientId) => {
        const patient = patients.find(p => p.id === patientId);
        return patient ? patient.name : 'Unknown';
    };

    const handleAllocateRoom = (room) => {
        setAllocatingRoom(room);
        setFormData({
            roomNumber: room.roomNumber,
            bedNumber: room.bedNumber,
            type: room.type,
            capacity: room.capacity,
            patientId: '',
            admissionDate: new Date().toISOString().split('T')[0],
            condition: '',
            equipment: room.equipment,
            nurseAssigned: '',
            dailyRate: room.dailyRate
        });
        setShowForm(true);
    };

    const handleAllocateSubmit = (e) => {
        e.preventDefault();
        const updatedRooms = rooms.map(room => 
            room.id === allocatingRoom.id 
                ? { 
                    ...room, 
                    ...formData, 
                    occupied: true,
                    patientName: getPatientName(formData.patientId),
                    status: 'Occupied'
                }
                : room
        );
        setRooms(updatedRooms);
        localStorage.setItem('hospitalRooms', JSON.stringify(updatedRooms));
        setShowForm(false);
        setAllocatingRoom(null);
        setFormData({
            roomNumber: '',
            bedNumber: '',
            type: 'General',
            capacity: 1,
            patientId: '',
            admissionDate: '',
            condition: '',
            equipment: '',
            nurseAssigned: '',
            dailyRate: 1500
        });
    };



    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const getPageTitle = () => {
        switch(currentView) {
            case 'icu': return 'ICU Ward Management';
            case 'emergency': return 'Emergency Ward Management';
            case 'general': return 'General Ward Management';
            default: return 'Rooms & Wards Management';
        }
    };

    const getFilteredRoomsByView = () => {
        let baseFiltered = rooms.filter(room => {
            const matchesSearch = 
                room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (room.bedNumber && room.bedNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (room.patientName && room.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (room.condition && room.condition.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (room.nurseAssigned && room.nurseAssigned.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesType = typeFilter === 'All' || room.type === typeFilter;
            const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
            return matchesSearch && matchesType && matchesStatus;
        });

        // Filter by current view
        switch(currentView) {
            case 'icu': return baseFiltered.filter(room => room.type === 'ICU');
            case 'emergency': return baseFiltered.filter(room => room.type === 'Emergency');
            case 'general': return baseFiltered.filter(room => room.type === 'General');
            default: return baseFiltered;
        }
    };

    const displayedRooms = getFilteredRoomsByView();

    return (
        <div className="appointments-container">
            <div className="appointments-header">
                <h1>{getPageTitle()}</h1>
                <button className="btn-primary" onClick={() => setShowForm(true)}>Add Room</button>
            </div>

            {currentView === 'main' && (
                <div style={{marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px'}}>
                    <h3 style={{margin: '0 0 15px 0'}}>Room Distribution</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '30px'}}>
                        <div style={{position: 'relative', width: '120px', height: '120px'}}>
                            <svg width="120" height="120" style={{transform: 'rotate(-90deg)'}}>
                                <circle cx="60" cy="60" r="50" fill="#dc3545" stroke="white" strokeWidth="2" 
                                    strokeDasharray={`${(rooms.filter(r => r.type === 'ICU').length / rooms.length) * 314} 314`} />
                                <circle cx="60" cy="60" r="50" fill="#fd7e14" stroke="white" strokeWidth="2" 
                                    strokeDasharray={`${(rooms.filter(r => r.type === 'Emergency').length / rooms.length) * 314} 314`}
                                    strokeDashoffset={`-${(rooms.filter(r => r.type === 'ICU').length / rooms.length) * 314}`} />
                                <circle cx="60" cy="60" r="50" fill="#28a745" stroke="white" strokeWidth="2" 
                                    strokeDasharray={`${(rooms.filter(r => r.type === 'General').length / rooms.length) * 314} 314`}
                                    strokeDashoffset={`-${((rooms.filter(r => r.type === 'ICU').length + rooms.filter(r => r.type === 'Emergency').length) / rooms.length) * 314}`} />
                            </svg>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <div style={{width: '16px', height: '16px', backgroundColor: '#dc3545', borderRadius: '3px'}}></div>
                                <span>ICU ({rooms.filter(r => r.type === 'ICU').length})</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <div style={{width: '16px', height: '16px', backgroundColor: '#fd7e14', borderRadius: '3px'}}></div>
                                <span>Emergency ({rooms.filter(r => r.type === 'Emergency').length})</span>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <div style={{width: '16px', height: '16px', backgroundColor: '#28a745', borderRadius: '3px'}}></div>
                                <span>General ({rooms.filter(r => r.type === 'General').length})</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="filters">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by room, patient, nurse, condition..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button style={{position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setSearchTerm('')}>×</button>
                    )}
                </div>
                <div className="filter-group">
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="All">All Types</option>
                        <option value="ICU">ICU</option>
                        <option value="Emergency">Emergency</option>
                        <option value="General">General</option>
                        <option value="Private">Private</option>
                        <option value="Maternity">Maternity</option>
                        <option value="Pediatric">Pediatric</option>
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Maintenance">Maintenance</option>
                    </select>
                </div>
            </div>

            <div className="appointments-table">
                <table>
                    <thead>
                        <tr>
                            <th>Room No</th>
                            <th>Bed No</th>
                            <th>Type</th>
                            <th>Capacity</th>
                            <th>Patient</th>
                            <th>Daily Rate</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedRooms.length === 0 ? (
                            <tr>
                                <td colSpan="8" style={{textAlign: 'center', padding: '20px', color: '#666'}}>
                                    {searchTerm || typeFilter !== 'All' || statusFilter !== 'All' 
                                        ? 'No rooms match your search criteria' 
                                        : 'No rooms available'}
                                </td>
                            </tr>
                        ) : (
                            displayedRooms.map(room => (
                            <tr key={room.id}>
                                <td>{room.roomNumber}</td>
                                <td>{room.bedNumber || 'N/A'}</td>
                                <td>{room.type}</td>
                                <td>{room.capacity}</td>
                                <td>{room.patientName || 'N/A'}</td>
                                <td>₹{room.dailyRate}</td>
                                <td>
                                    <span className={`status ${room.status.toLowerCase()}`}>
                                        {room.status}
                                    </span>
                                </td>
                                <td className="actions">
                                    <button className="btn-view" onClick={() => setViewingRoom(room)}>View</button>
                                    {room.status === 'Available' && (
                                        <button className="btn-complete" onClick={() => handleAllocateRoom(room)}>Allocate</button>
                                    )}
                                    <button className="btn-edit" onClick={() => handleEdit(room)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(room.id)}>Delete</button>
                                </td>
                            </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{allocatingRoom ? 'Allocate Room' : editingRoom ? 'Edit Room' : 'Add Room'}</h2>
                            <button className="close" onClick={resetForm}>&times;</button>
                        </div>
                        <form onSubmit={allocatingRoom ? handleAllocateSubmit : handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Room Number *</label>
                                    <input type="text" value={formData.roomNumber} onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} required />
                                </div>
                                <div className="form-group">
                                    <label>Bed Number *</label>
                                    <input type="text" value={formData.bedNumber} onChange={(e) => setFormData({...formData, bedNumber: e.target.value})} required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type *</label>
                                    <select 
                                        value={formData.type} 
                                        onChange={(e) => setFormData({...formData, type: e.target.value})} 
                                        required

                                    >
                                        <option value="General">General Ward</option>
                                        <option value="ICU">ICU</option>
                                        <option value="Emergency">Emergency</option>
                                        <option value="Private">Private Room</option>
                                        <option value="Maternity">Maternity</option>
                                        <option value="Pediatric">Pediatric</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Capacity *</label>
                                    <input type="number" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} min="1" required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Daily Rate (₹) *</label>
                                    <input type="number" value={formData.dailyRate} onChange={(e) => setFormData({...formData, dailyRate: parseInt(e.target.value)})} required />
                                </div>
                                <div className="form-group">
                                    <label>Patient {allocatingRoom ? '*' : ''}</label>
                                    <select 
                                        value={formData.patientId} 
                                        onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                                        required={allocatingRoom}
                                    >
                                        <option value="">{allocatingRoom ? 'Select Patient' : 'No Patient'}</option>
                                        {patients.map(patient => (
                                            <option key={patient.id} value={patient.id}>{patient.name} - {patient.phone}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {allocatingRoom && (
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Condition</label>
                                        <input 
                                            type="text" 
                                            value={formData.condition} 
                                            onChange={(e) => setFormData({...formData, condition: e.target.value})} 
                                            placeholder="Patient condition"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Assigned Nurse</label>
                                        <input 
                                            type="text" 
                                            value={formData.nurseAssigned} 
                                            onChange={(e) => setFormData({...formData, nurseAssigned: e.target.value})} 
                                            placeholder="Nurse name"
                                        />
                                    </div>
                                </div>
                            )}
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">
                                    {allocatingRoom ? 'Allocate Room' : editingRoom ? 'Update' : 'Add'}
                                </button>
                                <button type="button" className="btn-secondary" onClick={resetForm}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {viewingRoom && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Room Details</h2>
                            <button className="close" onClick={() => setViewingRoom(null)}>&times;</button>
                        </div>
                        <div style={{padding: '20px'}}>
                            <p><strong>Room:</strong> {viewingRoom.roomNumber}</p>
                            <p><strong>Bed:</strong> {viewingRoom.bedNumber || 'N/A'}</p>
                            <p><strong>Type:</strong> {viewingRoom.type}</p>
                            <p><strong>Capacity:</strong> {viewingRoom.capacity}</p>
                            <p><strong>Patient:</strong> {viewingRoom.patientName || 'No Patient'}</p>
                            <p><strong>Daily Rate:</strong> ₹{viewingRoom.dailyRate}</p>
                            <p><strong>Status:</strong> {viewingRoom.status}</p>
                            {viewingRoom.admissionDate && <p><strong>Admission:</strong> {viewingRoom.admissionDate}</p>}
                            {viewingRoom.condition && <p><strong>Condition:</strong> {viewingRoom.condition}</p>}
                            {viewingRoom.equipment && <p><strong>Equipment:</strong> {viewingRoom.equipment}</p>}
                            {viewingRoom.nurseAssigned && <p><strong>Nurse:</strong> {viewingRoom.nurseAssigned}</p>}
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={() => setViewingRoom(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rooms;