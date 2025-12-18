
import React, { useState, useEffect } from 'react';
import { useOutletContext, Navigate } from 'react-router-dom';
import "../styles/dashboard.css";

const Dashboard = () => {
    const { user } = useOutletContext();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Removed redirect to login - allow access to dashboard

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/hospital.json');
            const jsonData = await response.json();
            
            // Load from localStorage if available, otherwise use JSON data
            const savedPatients = localStorage.getItem('hospitalPatients');
            const savedDoctors = localStorage.getItem('hospitalDoctors');
            const savedAppointments = localStorage.getItem('hospitalAppointments');
            const savedStaff = localStorage.getItem('hospitalStaff');
            const savedMedicines = localStorage.getItem('hospitalMedicines');
            const savedPharmacyBills = localStorage.getItem('pharmacyBills');
            const savedLabTests = localStorage.getItem('labTests');
            const savedLabOrders = localStorage.getItem('labOrders');
            const savedSurgeries = localStorage.getItem('hospitalSurgeries');
            
            // Default surgery data if none exists
            const defaultSurgeries = [
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
                }
            ];
            
            const updatedData = {
                ...jsonData,
                patients: savedPatients ? JSON.parse(savedPatients) : jsonData.patients,
                doctors: savedDoctors ? JSON.parse(savedDoctors) : jsonData.doctors,
                appointments: savedAppointments ? JSON.parse(savedAppointments) : jsonData.appointments,
                staff: savedStaff ? JSON.parse(savedStaff) : jsonData.staff,
                pharmacy: savedMedicines ? JSON.parse(savedMedicines) : jsonData.pharmacy,
                pharmacyBills: savedPharmacyBills ? JSON.parse(savedPharmacyBills) : [],
                labTests: savedLabTests ? JSON.parse(savedLabTests) : [],
                labOrders: savedLabOrders ? JSON.parse(savedLabOrders) : [],
                surgeries: savedSurgeries ? JSON.parse(savedSurgeries) : defaultSurgeries,
                rooms: localStorage.getItem('hospitalRooms') ? JSON.parse(localStorage.getItem('hospitalRooms')) : jsonData.rooms || []
            };
            
            setData(updatedData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    const totalPatients = data?.patients?.length || 0;
    const todayPatients = data?.patients?.filter(p => p.visitDate === "2024-01-16")?.length || 0;
    const admittedPatients = data?.patients?.filter(p => p.admitted)?.length || 0;
    const outpatients = data?.patients?.filter(p => !p.admitted)?.length || 0;
    const appointmentsScheduled = data?.appointments?.filter(a => a.date === "2024-01-16")?.length || 0;
    const totalAppointments = data?.appointments?.length || 0;
    const completedAppointments = data?.appointments?.filter(a => a.status === 'Completed')?.length || 0;
    const pendingAppointments = data?.appointments?.filter(a => a.status === 'Pending' || a.status === 'Scheduled')?.length || 0;
    const consultationsScheduled = data?.onlineConsultations?.filter(c => c.date === "2024-01-16")?.length || 0;
    const totalConsultations = data?.onlineConsultations?.length || 0;
    const completedConsultations = data?.onlineConsultations?.filter(c => c.status === 'Completed')?.length || 0;
    const totalDoctors = data?.doctors?.length || 0;
    const doctorsAvailable = data?.doctors?.filter(d => d.available)?.length || 0;
    const doctorsUnavailable = data?.doctors?.filter(d => !d.available)?.length || 0;
    const specializations = [...new Set(data?.doctors?.map(d => d.specialization) || [])]?.length || 0;
    const surgeriesScheduled = data?.surgeries?.filter(s => s.date === "2024-01-16")?.length || 0;
    const totalSurgeries = data?.surgeries?.length || 0;
    const completedSurgeries = data?.surgeries?.filter(s => s.status === 'Completed')?.length || 0;
    const inProgressSurgeries = data?.surgeries?.filter(s => s.status === 'In Progress')?.length || 0;
    const surgeryRevenue = data?.surgeries?.filter(s => s.status === 'Completed' && s.cost).reduce((sum, surgery) => sum + surgery.cost, 0) || 0;
    const pharmacyAlerts = data?.pharmacy?.filter(p => p.stock < 50)?.length || 0;
    const totalMedicines = data?.pharmacy?.length || 0;
    const appointmentRevenue = data?.appointments?.filter(a => a.status === 'Completed' && a.fee).reduce((sum, apt) => sum + apt.fee, 0) || 0;
    const consultationRevenue = data?.onlineConsultations?.filter(c => c.status === 'Completed' && c.fee).reduce((sum, con) => sum + con.fee, 0) || 0;
    const billingRevenue = data?.billing?.filter(b => b.date === "2024-01-16").reduce((sum, bill) => sum + bill.total, 0) || 0;
    const pharmacyRevenue = data?.pharmacyBills?.filter(b => b.date === "2024-01-16").reduce((sum, bill) => sum + bill.totalAmount, 0) || 0;
    const totalMedicinesInStock = data?.pharmacy?.filter(m => m.stock > 0)?.length || 0;
    const lowStockMedicines = data?.pharmacy?.filter(m => m.stock <= 10)?.length || 0;
    const outOfStockMedicines = data?.pharmacy?.filter(m => m.stock === 0)?.length || 0;
    const totalPharmacyBills = data?.pharmacyBills?.length || 0;
    const todayPharmacyBills = data?.pharmacyBills?.filter(b => b.date === "2024-01-16")?.length || 0;
    const emergencyCases = data?.emergencies?.length || 0;
    const criticalEmergencies = data?.emergencies?.filter(e => e.severity === 'Critical')?.length || 0;
    const totalRooms = data?.rooms?.length || 0;
    const occupiedRooms = data?.rooms?.filter(r => r.occupied || r.status === 'Occupied')?.length || 0;
    const availableRooms = data?.rooms?.filter(r => !r.occupied || r.status === 'Available')?.length || 0;
    const icuBeds = data?.rooms?.filter(r => (r.type === "ICU" || r.type === "icu") && (!r.occupied || r.status === 'Available'))?.length || 0;
    const emergencyRooms = data?.rooms?.filter(r => r.type === "Emergency")?.length || 0;
    const generalRooms = data?.rooms?.filter(r => r.type === "General")?.length || 0;
    const roomRevenue = data?.rooms?.filter(r => r.occupied || r.status === 'Occupied').reduce((sum, room) => sum + (room.dailyRate || 0), 0) || 0;
    const totalStaff = data?.staff?.length || 0;
    const staffSalary = data?.staff?.reduce((sum, emp) => sum + (emp.salary || 0), 0) || 0;
    const totalLabTests = data?.labTests?.length || 0;
    const totalLabOrders = data?.labOrders?.length || 0;
    const todayLabOrders = data?.labOrders?.filter(o => o.orderDate === "2024-01-16")?.length || 0;
    const completedLabTests = data?.labOrders?.filter(o => o.status === 'Completed')?.length || 0;
    const pendingLabTests = data?.labOrders?.filter(o => o.status === 'Pending' || o.status === 'Ordered')?.length || 0;
    const labRevenue = data?.labOrders?.filter(o => o.status === 'Completed').reduce((sum, order) => sum + order.totalAmount, 0) || 0;
    const totalRevenue = appointmentRevenue + consultationRevenue + billingRevenue + pharmacyRevenue + labRevenue + surgeryRevenue + roomRevenue;

    return (
        <div className="dashboard">
            <div className="kpi-cards">
                <div className="kpi-card">
                    <h3>Total Patients</h3>
                    <span className="kpi-number">{totalPatients}</span>
                    <div className="kpi-details">
                        <small>Admitted: {admittedPatients} | Outpatients: {outpatients}</small>
                        <small>Today's Visits: {todayPatients}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Appointments</h3>
                    <span className="kpi-number">{totalAppointments}</span>
                    <div className="kpi-details">
                        <small>Completed: {completedAppointments} | Pending: {pendingAppointments}</small>
                        <small>Today: {appointmentsScheduled}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Online Consultations</h3>
                    <span className="kpi-number">{totalConsultations}</span>
                    <div className="kpi-details">
                        <small>Completed: {completedConsultations}</small>
                        <small>Today: {consultationsScheduled}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Doctors</h3>
                    <span className="kpi-number">{totalDoctors}</span>
                    <div className="kpi-details">
                        <small>Available: {doctorsAvailable} | Unavailable: {doctorsUnavailable}</small>
                        <small>Specializations: {specializations}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Surgeries</h3>
                    <span className="kpi-number">{totalSurgeries}</span>
                    <div className="kpi-details">
                        <small>Completed: {completedSurgeries} | In Progress: {inProgressSurgeries}</small>
                        <small>Today: {surgeriesScheduled}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Rooms & Beds</h3>
                    <span className="kpi-number">{totalRooms}</span>
                    <div className="kpi-details">
                        <small>Occupied: {occupiedRooms} | Available: {availableRooms} | Maintenance: {data?.rooms?.filter(r => r.status === 'Maintenance')?.length || 0}</small>
                        <small>ICU: {data?.rooms?.filter(r => r.type === 'ICU')?.length || 0} | Emergency: {emergencyRooms} | General: {generalRooms}</small>
                        <small>Private: {data?.rooms?.filter(r => r.type === 'Private')?.length || 0} | Maternity: {data?.rooms?.filter(r => r.type === 'Maternity')?.length || 0} | Pediatric: {data?.rooms?.filter(r => r.type === 'Pediatric')?.length || 0}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Total Revenue</h3>
                    <span className="kpi-number">₹{totalRevenue.toLocaleString()}</span>
                    <div className="kpi-details">
                        <small>Appointments: ₹{appointmentRevenue.toLocaleString()}</small>
                        <small>Consultations: ₹{consultationRevenue.toLocaleString()}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Pharmacy</h3>
                    <span className="kpi-number">{totalMedicines}</span>
                    <div className="kpi-details">
                        <small>In Stock: {totalMedicinesInStock} | Low Stock: {lowStockMedicines}</small>
                        <small>Bills Today: {todayPharmacyBills}</small>
                    </div>
                </div>
                <div className="kpi-card">
                    <h3>Laboratory</h3>
                    <span className="kpi-number">{totalLabOrders}</span>
                    <div className="kpi-details">
                        <small>Completed: {completedLabTests} | Pending: {pendingLabTests}</small>
                        <small>Tests Available: {totalLabTests}</small>
                    </div>
                </div>
                <div className="kpi-card alert">
                    <h3>Alerts & Emergencies</h3>
                    <span className="kpi-number">{emergencyCases + lowStockMedicines + (data?.rooms?.filter(r => r.status === 'Maintenance')?.length || 0)}</span>
                    <div className="kpi-details">
                        <small>Critical Patients: {data?.rooms?.filter(r => r.condition && r.condition.toLowerCase().includes('critical'))?.length || 0}</small>
                        <small>Low Stock: {lowStockMedicines} | Maintenance: {data?.rooms?.filter(r => r.status === 'Maintenance')?.length || 0}</small>
                        <small>Fever Cases: {data?.rooms?.filter(r => r.condition && r.condition.toLowerCase().includes('fever'))?.length || 0} | Accidents: {data?.rooms?.filter(r => r.condition && r.condition.toLowerCase().includes('accident'))?.length || 0}</small>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="left-section">
                    <div className="chart-container">
                        <h3>Today's Schedule</h3>
                        <table className="appointment-table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Type</th>
                                    <th>Patient ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.appointments?.filter(apt => apt.date === "2024-01-16")?.map(apt => (
                                    <tr key={apt.id}>
                                        <td>{apt.time}</td>
                                        <td>Appointment</td>
                                        <td>{apt.patientId}</td>
                                        <td><span className={`status ${apt.status.toLowerCase()}`}>{apt.status}</span></td>
                                    </tr>
                                ))}
                                {data?.onlineConsultations?.filter(con => con.date === "2024-01-16")?.map(con => (
                                    <tr key={con.id}>
                                        <td>{con.time}</td>
                                        <td>Online</td>
                                        <td>{con.patientId}</td>
                                        <td><span className={`status ${con.status.toLowerCase()}`}>{con.status}</span></td>
                                    </tr>
                                ))}
                                {data?.surgeries?.filter(surgery => surgery.date === "2024-01-16")?.map(surgery => (
                                    <tr key={surgery.id}>
                                        <td>{surgery.time}</td>
                                        <td>Surgery</td>
                                        <td>{surgery.patientId}</td>
                                        <td><span className={`status ${surgery.status.toLowerCase().replace(' ', '-')}`}>{surgery.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="chart-container">
                        <h3>Patient Flow</h3>
                        <div className="pie-chart-container">
                            <div className="pie-chart-visual">
                                <div className="pie-slice slice-1" style={{transform: 'rotate(0deg)'}}></div>
                                <div className="pie-slice slice-2" style={{transform: 'rotate(72deg)'}}></div>
                                <div className="pie-slice slice-3" style={{transform: 'rotate(144deg)'}}></div>
                                <div className="pie-slice slice-4" style={{transform: 'rotate(216deg)'}}></div>
                                <div className="pie-slice slice-5" style={{transform: 'rotate(288deg)'}}></div>
                            </div>
                            <div className="pie-legend">
                                <div className="legend-item">
                                    <div className="legend-color color-1"></div>
                                    <span>Monday: 25</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color color-2"></div>
                                    <span>Tuesday: 32</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color color-3"></div>
                                    <span>Wednesday: 18</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color color-4"></div>
                                    <span>Thursday: 38</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color color-5"></div>
                                    <span>Friday: 28</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3>Department-wise Patient Count</h3>
                        <div className="pie-chart-container">
                            <div className="dept-pie-chart">
                                <div className="dept-pie-visual"></div>
                            </div>
                            <div className="dept-legend">
                                {data?.departments?.filter(dept => dept.patientCount > 0)?.map((dept, index) => (
                                    <div key={dept.id} className="dept-legend-item">
                                        <div className={`dept-legend-color dept-color-${index}`}></div>
                                        <span>{dept.name}: {dept.patientCount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3>Hospital Performance Metrics</h3>
                        <div className="performance-metrics">
                            <div className="metric-row">
                                <div className="metric-item">
                                    <span className="metric-label">Patient Satisfaction</span>
                                    <div className="metric-bar">
                                        <div className="metric-fill" style={{width: '92%'}}></div>
                                    </div>
                                    <span className="metric-value">92%</span>
                                </div>
                            </div>
                            <div className="metric-row">
                                <div className="metric-item">
                                    <span className="metric-label">Bed Occupancy Rate</span>
                                    <div className="metric-bar">
                                        <div className="metric-fill" style={{width: `${totalRooms > 0 ? (occupiedRooms/totalRooms)*100 : 0}%`}}></div>
                                    </div>
                                    <span className="metric-value">{totalRooms > 0 ? Math.round((occupiedRooms/totalRooms)*100) : 0}%</span>
                                </div>
                            </div>
                            <div className="metric-row">
                                <div className="metric-item">
                                    <span className="metric-label">Staff Efficiency</span>
                                    <div className="metric-bar">
                                        <div className="metric-fill" style={{width: '88%'}}></div>
                                    </div>
                                    <span className="metric-value">88%</span>
                                </div>
                            </div>
                            <div className="metric-row">
                                <div className="metric-item">
                                    <span className="metric-label">Equipment Uptime</span>
                                    <div className="metric-bar">
                                        <div className="metric-fill" style={{width: '95%'}}></div>
                                    </div>
                                    <span className="metric-value">95%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="chart-container">
                        <h3>Room Status Overview</h3>
                        <div className="system-overview">
                            <div className="overview-item">
                                <span className="overview-label">ICU Available</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.type === 'ICU' && r.status === 'Available')?.length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Emergency Available</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.type === 'Emergency' && r.status === 'Available')?.length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">General Available</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.type === 'General' && r.status === 'Available')?.length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Rooms in Maintenance</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.status === 'Maintenance')?.length || 0}</span>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="right-section">
                    <div className="alert-container">
                        <h3>Staff Overview</h3>
                        <div className="system-overview">
                            <div className="overview-item">
                                <span className="overview-label">Total Staff</span>
                                <span className="overview-value">{data?.staff?.filter(s => ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist'].includes(s.role)).length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Active Staff</span>
                                <span className="overview-value">{data?.staff?.filter(s => ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist'].includes(s.role) && s.status === 'Active').length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Staff on Leave</span>
                                <span className="overview-value">{data?.staff?.filter(s => ['Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Physiotherapist'].includes(s.role) && s.status === 'Leave').length || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="alert-container">
                        <h3>Worker Overview</h3>
                        <div className="system-overview">
                            <div className="overview-item">
                                <span className="overview-label">Total Workers</span>
                                <span className="overview-value">{data?.staff?.filter(s => ['Ward Boy', 'Cleaning Staff', 'Watchman', 'Security Guard', 'Maintenance Worker', 'Ambulance Driver'].includes(s.role)).length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Active Workers</span>
                                <span className="overview-value">{data?.staff?.filter(s => ['Ward Boy', 'Cleaning Staff', 'Watchman', 'Security Guard', 'Maintenance Worker', 'Ambulance Driver'].includes(s.role) && s.status === 'Active').length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Workers on Leave</span>
                                <span className="overview-value">{data?.staff?.filter(s => ['Ward Boy', 'Cleaning Staff', 'Watchman', 'Security Guard', 'Maintenance Worker', 'Ambulance Driver'].includes(s.role) && s.status === 'Leave').length || 0}</span>
                            </div>
                        </div>
                    </div>



                    <div className="alert-container">
                        <h3>System Overview</h3>
                        <div className="system-overview">
                            <div className="overview-item">
                                <span className="overview-label">Medicines</span>
                                <span className="overview-value">{totalMedicines}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Departments</span>
                                <span className="overview-value">{data?.departments?.length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Room Occupancy</span>
                                <span className="overview-value">{totalRooms > 0 ? Math.round((occupiedRooms/totalRooms)*100) : 0}%</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">ICU Available</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.type === 'ICU' && r.status === 'Available')?.length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Emergency Available</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.type === 'Emergency' && r.status === 'Available')?.length || 0}</span>
                            </div>
                            <div className="overview-item">
                                <span className="overview-label">Critical Patients</span>
                                <span className="overview-value">{data?.rooms?.filter(r => r.condition && r.condition.toLowerCase().includes('critical'))?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="alert-container">
                        <h3>Revenue Breakdown</h3>
                        <div className="revenue-breakdown">
                            <div className="revenue-item">
                                <span className="revenue-label">Appointments</span>
                                <span className="revenue-amount">₹{appointmentRevenue.toLocaleString()}</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Consultations</span>
                                <span className="revenue-amount">₹{consultationRevenue.toLocaleString()}</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Billing</span>
                                <span className="revenue-amount">₹{billingRevenue.toLocaleString()}</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Pharmacy</span>
                                <span className="revenue-amount">₹{pharmacyRevenue.toLocaleString()}</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Laboratory</span>
                                <span className="revenue-amount">₹{labRevenue.toLocaleString()}</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Surgeries</span>
                                <span className="revenue-amount">₹{surgeryRevenue.toLocaleString()}</span>
                            </div>
                            <div className="revenue-item">
                                <span className="revenue-label">Room Revenue</span>
                                <span className="revenue-amount">₹{roomRevenue.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>



                    <div className="alert-container">
                        <h3>Today's Surgeries</h3>
                        <div className="surgery-list">
                            {data?.surgeries?.filter(surgery => surgery.date === "2024-01-16")?.map(surgery => {
                                const surgeon = data?.doctors?.find(d => d.id === surgery.surgeonId);
                                return (
                                    <div key={surgery.id} className="surgery-item">
                                        <span className="surgery-time">{surgery.time}</span>
                                        <span className="surgery-type">{surgery.surgeryType}</span>
                                        <span className="surgeon">{surgeon?.name || 'Unknown'}</span>
                                        <span className={`status ${surgery.status.toLowerCase().replace(' ', '-')}`}>{surgery.status}</span>
                                    </div>
                                );
                            })}
                            {data?.surgeries?.filter(surgery => surgery.date === "2024-01-16")?.length === 0 && (
                                <div className="no-surgeries">No surgeries scheduled for today</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
