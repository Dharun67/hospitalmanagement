import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/appointments.css';

const Employee = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddStaffForm, setShowAddStaffForm] = useState(false);
  const [showManageStaffMode, setShowManageStaffMode] = useState(false);
  const [showStaffDetailsMode, setShowStaffDetailsMode] = useState(false);
  const [showAddWorkerForm, setShowAddWorkerForm] = useState(false);
  const [showManageWorkerMode, setShowManageWorkerMode] = useState(false);
  const [showWorkerDetailsMode, setShowWorkerDetailsMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    name: '', role: '', shift: 'Morning', salary: '', joiningDate: new Date().toISOString().split('T')[0], 
    phone: '', email: '', address: '', emergencyContact: '', status: 'Active'
  });

  const [filterShift, setFilterShift] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.pathname === '/employee/staff/add') {
      setShowAddStaffForm(true);
      resetOtherModes();
    } else if (location.pathname === '/employee/staff/manage') {
      setShowManageStaffMode(true);
      resetOtherModes();
    } else if (location.pathname === '/employee/staff/details') {
      setShowStaffDetailsMode(true);
      resetOtherModes();
    } else if (location.pathname === '/employee/worker/add') {
      setShowAddWorkerForm(true);
      resetOtherModes();
    } else if (location.pathname === '/employee/worker/manage') {
      setShowManageWorkerMode(true);
      resetOtherModes();
    } else if (location.pathname === '/employee/worker/details') {
      setShowWorkerDetailsMode(true);
      resetOtherModes();
    } else {
      resetAllModes();
    }
  }, [location.pathname]);

  const resetOtherModes = () => {
    if (!location.pathname.includes('/staff/add')) setShowAddStaffForm(false);
    if (!location.pathname.includes('/staff/manage')) setShowManageStaffMode(false);
    if (!location.pathname.includes('/staff/details')) setShowStaffDetailsMode(false);
    if (!location.pathname.includes('/worker/add')) setShowAddWorkerForm(false);
    if (!location.pathname.includes('/worker/manage')) setShowManageWorkerMode(false);
    if (!location.pathname.includes('/worker/details')) setShowWorkerDetailsMode(false);
  };

  const resetAllModes = () => {
    setShowAddStaffForm(false);
    setShowManageStaffMode(false);
    setShowStaffDetailsMode(false);
    setShowAddWorkerForm(false);
    setShowManageWorkerMode(false);
    setShowWorkerDetailsMode(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/hospital.json');
      const data = await response.json();
      
      const savedStaff = localStorage.getItem('hospitalStaff');
      setStaff(savedStaff ? JSON.parse(savedStaff) : data.staff);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const generateEmployeeId = () => {
    const lastId = staff[staff.length - 1]?.id || 'STF000';
    const num = parseInt(lastId.replace('STF', '')) + 1;
    return `STF${num.toString().padStart(3, '0')}`;
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    
    // Input validation
    if (!employeeData.name.trim() || !employeeData.role || !employeeData.salary) {
      alert('Please fill all required fields');
      return;
    }
    
    if (parseInt(employeeData.salary) < 10000 || parseInt(employeeData.salary) > 100000) {
      alert('Salary must be between ₹10,000 and ₹1,00,000');
      return;
    }
    
    const newEmployee = {
      id: generateEmployeeId(),
      ...employeeData,
      salary: parseInt(employeeData.salary),
      name: employeeData.name.trim(),
      createdAt: new Date().toISOString()
    };
    const updatedStaff = [...staff, newEmployee];
    setStaff(updatedStaff);
    
    localStorage.setItem('hospitalStaff', JSON.stringify(updatedStaff));
    
    setEmployeeData({ name: '', role: '', shift: 'Morning', salary: '', joiningDate: new Date().toISOString().split('T')[0], phone: '', email: '', address: '', emergencyContact: '' });
    setShowAddStaffForm(false);
    setShowAddWorkerForm(false);
    window.history.pushState({}, '', '/employee');
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee.id);
    setEmployeeData({
      name: employee.name,
      role: employee.role,
      shift: employee.shift,
      salary: employee.salary || '',
      joiningDate: employee.joiningDate || new Date().toISOString().split('T')[0],
      phone: employee.phone || '',
      email: employee.email || '',
      address: employee.address || '',
      emergencyContact: employee.emergencyContact || '',
      status: employee.status || 'Active'
    });
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    
    // Input validation
    if (!employeeData.name.trim() || !employeeData.role || !employeeData.salary) {
      alert('Please fill all required fields');
      return;
    }
    
    if (parseInt(employeeData.salary) < 10000 || parseInt(employeeData.salary) > 100000) {
      alert('Salary must be between ₹10,000 and ₹1,00,000');
      return;
    }
    
    const updatedStaff = staff.map(s => 
      s.id === editingEmployee ? { 
        ...s, 
        ...employeeData, 
        salary: parseInt(employeeData.salary),
        name: employeeData.name.trim(),
        updatedAt: new Date().toISOString()
      } : s
    );
    setStaff(updatedStaff);
    
    localStorage.setItem('hospitalStaff', JSON.stringify(updatedStaff));
    
    setEditingEmployee(null);
    setEmployeeData({ name: '', role: '', shift: 'Morning', salary: '', joiningDate: new Date().toISOString().split('T')[0], phone: '', email: '', address: '', emergencyContact: '' });
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Delete this employee?')) {
      const updatedStaff = staff.filter(s => s.id !== id);
      setStaff(updatedStaff);
      
      localStorage.setItem('hospitalStaff', JSON.stringify(updatedStaff));
    }
  };

  const handleToggleStatus = (id) => {
    const updatedStaff = staff.map(s => 
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Leave' : 'Active' } : s
    );
    setStaff(updatedStaff);
    
    localStorage.setItem('hospitalStaff', JSON.stringify(updatedStaff));
  };

  const getFilteredEmployees = () => {
    let filtered = staff.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showStaffDetailsMode || showManageStaffMode || showAddStaffForm) {
      filtered = filtered.filter(emp => 
        ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist'].includes(emp.role)
      );
    } else if (showWorkerDetailsMode || showManageWorkerMode || showAddWorkerForm) {
      filtered = filtered.filter(emp => 
        ['Ward Boy', 'Cleaning Staff', 'Watchman', 'Security Guard', 'Maintenance Worker', 'Ambulance Driver'].includes(emp.role)
      );
    }

    // Filter by shift
    if (filterShift !== 'All') {
      filtered = filtered.filter(emp => emp.shift === filterShift);
    }

    // Sort employees
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || '';
      let bValue = b[sortBy] || '';
      
      if (sortBy === 'salary') {
        aValue = parseInt(aValue) || 0;
        bValue = parseInt(bValue) || 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const getPageTitle = () => {
    if (showAddStaffForm) return 'Employee - Add Staff';
    if (showManageStaffMode) return 'Employee - Manage Staff';
    if (showStaffDetailsMode) return 'Employee - Staff Details';
    if (showAddWorkerForm) return 'Employee - Add Worker';
    if (showManageWorkerMode) return 'Employee - Manage Worker';
    if (showWorkerDetailsMode) return 'Employee - Worker Details';
    return 'Employee';
  };

  const isStaffMode = () => showAddStaffForm || showManageStaffMode || showStaffDetailsMode;
  const isWorkerMode = () => showAddWorkerForm || showManageWorkerMode || showWorkerDetailsMode;
  const isAddMode = () => showAddStaffForm || showAddWorkerForm;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const filteredEmployees = getFilteredEmployees();
  const staffEmployees = staff.filter(s => ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist'].includes(s.role));
  const workerEmployees = staff.filter(s => ['Ward Boy', 'Cleaning Staff', 'Watchman', 'Security Guard', 'Maintenance Worker', 'Ambulance Driver'].includes(s.role));
  const staffCount = staffEmployees.length;
  const workerCount = workerEmployees.length;
  const staffSalary = staffEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const workerSalary = workerEmployees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  const totalSalary = staff.reduce((sum, emp) => sum + (emp.salary || 0), 0);

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1>{getPageTitle()}</h1>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="number">{staff.length}</span>
          <span className="label">Total Employees</span>
        </div>
        <div className="stat">
          <span className="number">{staffCount}</span>
          <span className="label">Staff Members</span>
          <div className="kpi-details">
            <small>Salary: ₹{staffSalary.toLocaleString()}</small>
          </div>
        </div>
        <div className="stat">
          <span className="number">{workerCount}</span>
          <span className="label">Workers</span>
          <div className="kpi-details">
            <small>Salary: ₹{workerSalary.toLocaleString()}</small>
          </div>
        </div>
        <div className="stat">
          <span className="number">₹{totalSalary.toLocaleString()}</span>
          <span className="label">Total Salary</span>
        </div>
      </div>

      {!isAddMode() && (
        <div className="controls">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search"
          />
          <select value={filterShift} onChange={(e) => setFilterShift(e.target.value)} className="filter">
            <option value="All">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
            <option value="Full Day">Full Day</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter">
            <option value="name">Sort by Name</option>
            <option value="role">Sort by Role</option>
            <option value="salary">Sort by Salary</option>
            <option value="joiningDate">Sort by Joining Date</option>
          </select>


        </div>
      )}

      {!isAddMode() && (
        <div className="table-container">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Joining Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>
                    <span className={`status ${employee.shift.toLowerCase()}`}>
                      {employee.shift}
                    </span>
                  </td>
                  <td>
                    <span className={`status ${employee.status === 'Active' ? 'confirmed' : 'cancelled'}`}>
                      {employee.status || 'Active'}
                    </span>
                  </td>
                  <td>₹{employee.salary ? employee.salary.toLocaleString() : 'N/A'}</td>
                  <td>{employee.joiningDate || 'N/A'}</td>
                  <td>
                    <button className="btn-view" onClick={() => setViewingEmployee(employee)}>View</button>
                    {!isAddMode() && !showManageStaffMode && !showManageWorkerMode && !showStaffDetailsMode && !showWorkerDetailsMode && (
                      <button 
                        className={`btn-${employee.status === 'Active' ? 'complete' : 'edit'}`} 
                        onClick={() => handleToggleStatus(employee.id)}
                      >
                        {employee.status === 'Active' ? 'Set Leave' : 'Set Active'}
                      </button>
                    )}
                    {(showManageStaffMode || showManageWorkerMode) && (
                      <>
                        <button className="btn-edit" onClick={() => handleEditEmployee(employee)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                      </>
                    )}
                    {(showStaffDetailsMode || showWorkerDetailsMode) && (
                      <button className="btn-delete" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(isAddMode() || editingEmployee) && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingEmployee ? 'Edit Employee' : (isStaffMode() ? 'Add New Staff' : 'Add New Worker')}</h2>
              <button className="close" onClick={() => {
                setShowAddStaffForm(false);
                setShowAddWorkerForm(false);
                setEditingEmployee(null);
                setEmployeeData({ name: '', role: '', shift: 'Morning', salary: '', joiningDate: new Date().toISOString().split('T')[0], phone: '', email: '', address: '', emergencyContact: '' });
                if (isAddMode()) window.history.pushState({}, '', '/employee');
              }}>&times;</button>
            </div>
            <form onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input 
                    type="text" 
                    value={employeeData.name} 
                    onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <select 
                    value={employeeData.role} 
                    onChange={(e) => setEmployeeData({...employeeData, role: e.target.value})} 
                    required
                  >
                    <option value="">Select Role</option>
                    {isStaffMode() ? (
                      <>
                        <option value="Nurse">Nurse</option>
                        <option value="Receptionist">Receptionist</option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Radiologist">Radiologist</option>
                        <option value="Physiotherapist">Physiotherapist</option>
                      </>
                    ) : (
                      <>
                        <option value="Ward Boy">Ward Boy</option>
                        <option value="Cleaning Staff">Cleaning Staff</option>
                        <option value="Watchman">Watchman</option>
                        <option value="Security Guard">Security Guard</option>
                        <option value="Maintenance Worker">Maintenance Worker</option>
                        <option value="Ambulance Driver">Ambulance Driver</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Shift</label>
                  <select value={employeeData.shift} onChange={(e) => setEmployeeData({...employeeData, shift: e.target.value})}>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                    <option value="Full Day">Full Day</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={employeeData.status} onChange={(e) => setEmployeeData({...employeeData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Leave">Leave</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Salary *</label>
                  <input 
                    type="number" 
                    value={employeeData.salary} 
                    onChange={(e) => setEmployeeData({...employeeData, salary: e.target.value})} 
                    required 
                    placeholder="Enter salary amount"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Joining Date</label>
                  <input 
                    type="date" 
                    value={employeeData.joiningDate} 
                    onChange={(e) => setEmployeeData({...employeeData, joiningDate: e.target.value})} 
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input 
                    type="tel" 
                    value={employeeData.phone} 
                    onChange={(e) => setEmployeeData({...employeeData, phone: e.target.value})} 
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={employeeData.email} 
                    onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})} 
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label>Emergency Contact</label>
                  <input 
                    type="tel" 
                    value={employeeData.emergencyContact} 
                    onChange={(e) => setEmployeeData({...employeeData, emergencyContact: e.target.value})} 
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Address</label>
                  <textarea 
                    value={employeeData.address} 
                    onChange={(e) => setEmployeeData({...employeeData, address: e.target.value})} 
                    placeholder="Enter full address"
                    rows="2"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
                <button type="button" className="btn-secondary" onClick={() => {
                  setShowAddStaffForm(false);
                  setShowAddWorkerForm(false);
                  setEditingEmployee(null);
                  setEmployeeData({ name: '', role: '', shift: 'Morning', salary: '', joiningDate: new Date().toISOString().split('T')[0], phone: '', email: '', address: '', emergencyContact: '' });
                  if (isAddMode()) window.history.pushState({}, '', '/employee');
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingEmployee && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Employee Details</h2>
              <button className="close" onClick={() => setViewingEmployee(null)}>&times;</button>
            </div>
            <div className="patient-details">
              <div className="detail-row">
                <strong>ID:</strong> {viewingEmployee.id}
              </div>
              <div className="detail-row">
                <strong>Name:</strong> {viewingEmployee.name}
              </div>
              <div className="detail-row">
                <strong>Role:</strong> {viewingEmployee.role}
              </div>
              <div className="detail-row">
                <strong>Shift:</strong> 
                <span className={`status ${viewingEmployee.shift.toLowerCase()}`}>
                  {viewingEmployee.shift}
                </span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span className={`status ${viewingEmployee.status === 'Active' ? 'confirmed' : 'cancelled'}`}>
                  {viewingEmployee.status || 'Active'}
                </span>
              </div>
              <div className="detail-row">
                <strong>Monthly Salary:</strong> ₹{viewingEmployee.salary ? viewingEmployee.salary.toLocaleString() : 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Joining Date:</strong> {viewingEmployee.joiningDate || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Phone:</strong> {viewingEmployee.phone || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {viewingEmployee.email || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Address:</strong> {viewingEmployee.address || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Emergency Contact:</strong> {viewingEmployee.emergencyContact || 'N/A'}
              </div>
              <div className="detail-row">
                <strong>Category:</strong> {['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist'].includes(viewingEmployee.role) ? 'Staff' : 'Worker'}
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-delete" onClick={() => {
                handleDeleteEmployee(viewingEmployee.id);
                setViewingEmployee(null);
              }}>Delete Employee</button>
              <button className="btn-secondary" onClick={() => setViewingEmployee(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;