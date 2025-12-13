import {NavLink, useNavigate} from 'react-router-dom';
import  '../App.css';

const Header = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className='header'>
    <div className="links">
        <NavLink to={"/home"} >Home</NavLink>
        <NavLink to={"/dashboard"} >Dashboard</NavLink>   
        <div className="dropdown">
            <NavLink to={"/patients"} className="dropdown-toggle">Patients</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/patients/add"} className="dropdown-item">Add Patient</NavLink>
                <NavLink to={"/patients/details"} className="dropdown-item">Patient Details</NavLink>
                <NavLink to={"/patients/outpatients"} className="dropdown-item">Outpatients</NavLink>
            </div>
        </div> 
        <div className="dropdown">
            <NavLink to={"/doctors"} className="dropdown-toggle">Doctors</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/doctors/add"} className="dropdown-item">Add Doctor</NavLink>
                <NavLink to={"/doctors/manage"} className="dropdown-item">Manage Doctor</NavLink>
                <NavLink to={"/doctors/details"} className="dropdown-item">Doctor Details</NavLink>
                <NavLink to={"/doctors/appointments"} className="dropdown-item">Appointments</NavLink>
            </div>
        </div>   
        <div className="dropdown">
            <NavLink to={"/appointments"} className="dropdown-toggle">Appointments</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/appointments/book"} className="dropdown-item">Book Appointment</NavLink>
                <NavLink to={"/appointments/manage"} className="dropdown-item">Manage Appointment</NavLink>
                <NavLink to={"/appointments/online-consultation"} className="dropdown-item">Online Consultation</NavLink>
            </div>
        </div>
        <div className="dropdown">
            <NavLink to={"/employee"} className="dropdown-toggle">Employee</NavLink>
            <div className="dropdown-menu">
                <div className="dropdown-submenu">
                    <span className="dropdown-item">Staffs ›</span>
                    <div className="submenu">
                        <NavLink to={"/employee/staff/add"} className="dropdown-item">Add Staff</NavLink>
                        <NavLink to={"/employee/staff/manage"} className="dropdown-item">Manage Staff</NavLink>
                        <NavLink to={"/employee/staff/details"} className="dropdown-item">Staff Details</NavLink>
                    </div>
                </div>
                <div className="dropdown-submenu">
                    <span className="dropdown-item">Workers ›</span>
                    <div className="submenu">
                        <NavLink to={"/employee/worker/add"} className="dropdown-item">Add Worker</NavLink>
                        <NavLink to={"/employee/worker/manage"} className="dropdown-item">Manage Worker</NavLink>
                        <NavLink to={"/employee/worker/details"} className="dropdown-item">Worker Details</NavLink>
                    </div>
                </div>
            </div>
        </div>
        <div className="dropdown">
            <NavLink to={"/pharmacy"} className="dropdown-toggle">Pharmacy</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/pharmacy/add-stock"} className="dropdown-item">Add Stock</NavLink>
                <NavLink to={"/pharmacy/bill-medicine"} className="dropdown-item">Bill Medicine</NavLink>
                <NavLink to={"/pharmacy/medicine-details"} className="dropdown-item">Medicine Details</NavLink>
            </div>
        </div>
        <div className="dropdown">
            <NavLink to={"/laboratory"} className="dropdown-toggle">Laboratory</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/laboratory/orders"} className="dropdown-item">Test Orders</NavLink>
                <NavLink to={"/laboratory/tests"} className="dropdown-item">Test Management</NavLink>
                <NavLink to={"/laboratory/results"} className="dropdown-item">Test Results</NavLink>
                <NavLink to={"/laboratory/reports"} className="dropdown-item">Reports</NavLink>
            </div>
        </div>
        <div className="dropdown">
            <NavLink to={"/surgeries"} className="dropdown-toggle">Surgeries</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/surgeries/patient-details"} className="dropdown-item">Patient Details</NavLink>
                <NavLink to={"/surgeries/add"} className="dropdown-item">Add Surgeries</NavLink>
                <NavLink to={"/surgeries/reports"} className="dropdown-item">Surgery Reports</NavLink>
            </div>
        </div>
        <div className="dropdown">
            <NavLink to={"/rooms"} className="dropdown-toggle">Rooms/Wards</NavLink>
            <div className="dropdown-menu">
                <NavLink to={"/rooms/icu-details"} className="dropdown-item">ICU Details</NavLink>
                <NavLink to={"/rooms/emergency-ward"} className="dropdown-item">Emergency Ward</NavLink>
                <NavLink to={"/rooms/general-ward"} className="dropdown-item">General Ward</NavLink>
            </div>
        </div>   
    </div>
    <div className="user-info">
        <span>Welcome, {user}</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
    </header>
  );
};

export default Header