import { useOutletContext, Navigate, useNavigate } from 'react-router-dom';
import "../styles/home.css";

const Home = () => {
    const { user } = useOutletContext();
    const navigate = useNavigate();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const handleBookAppointment = () => {
        navigate('/appointments/book');
    };

    const handleFindDoctor = () => {
        navigate('/doctors');
    };

    const handleOnlineConsultation = () => {
        navigate('/appointments/online-consultation/book');
    };

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Your Health, Our Priority</h1>
                    <p>Providing exceptional healthcare services with compassion and expertise</p>
                    <div className="hero-buttons">
                        <button className="btn-primary" onClick={handleBookAppointment}>Book Appointment</button>
                        <button className="btn-secondary" onClick={handleFindDoctor}>Find Doctor</button>
                        <button className="btn-tertiary" onClick={handleOnlineConsultation}>Online Consultation</button>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="/images/image.png" alt="Hospital Building" className="hospital-image" />
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <h3>24/7 Emergency</h3>
                    <p>Round-the-clock emergency care</p>
                </div>
                <div className="feature-card">
                    <h3>Qualified Doctors</h3>
                    <p>Expert medical professionals</p>
                </div>
                <div className="feature-card">
                    <h3>Online Consulting</h3>
                    <p>Virtual healthcare consultations</p>
                </div>
                <div className="feature-card">
                    <h3>Pharmacy Support</h3>
                    <p>Complete medication services</p>
                </div>
            </section>

            <section className="departments">
                <h2>Our Departments</h2>
                <div className="dept-slider">
                    <div className="dept-card">Cardiology</div>
                    <div className="dept-card">Neurology</div>
                    <div className="dept-card">Orthopedics</div>
                    <div className="dept-card">Pediatrics</div>
                </div>
            </section>

            <section className="doctors">
                <h2>Featured Doctors</h2>
                <div className="doctor-grid">
                    <div className="doctor-card">
                        <h4>Dr. Rohan Singh</h4>
                        <p>Cardiologist</p>
                    </div>
                    <div className="doctor-card">
                        <h4>Dr. Priya Sharma</h4>
                        <p>Neurologist</p>
                    </div>
                    <div className="doctor-card">
                        <h4>Dr. Aman Verma</h4>
                        <p>Orthopedic</p>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default Home;