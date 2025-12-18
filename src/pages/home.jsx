import { useOutletContext, Navigate, useNavigate } from 'react-router-dom';
import "../styles/home.css";

const Home = () => {
    const { user } = useOutletContext();
    const navigate = useNavigate();
    
    // Removed redirect to login - allow access to home page

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
                   
                </div>
            </section>

            <section className="features">
                <div className="feature-card">
                    <div className="feature-icon"><img src="/image/icons8-24-7-open-sign-32.png" alt="24/7" /></div>
                    <h3>24/7 Emergency Care</h3>
                    <p>Round-the-clock emergency medical services with state-of-the-art trauma care facilities</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><img src="/image/icons8-medical-team-50.png" alt="Medical Team" /></div>
                    <h3>Expert Medical Team</h3>
                    <p>Board-certified specialists with years of experience in their respective fields</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><img src="/image/icons8-telemedicine-50.png" alt="Telemedicine" /></div>
                    <h3>Telemedicine Services</h3>
                    <p>Convenient online consultations with our medical experts from your home</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon"><img src="/image/icons8-pharmacy-shop-50.png" alt="Pharmacy" /></div>
                    <h3>In-House Pharmacy</h3>
                    <p>Complete pharmaceutical services with quality medications and expert guidance</p>
                </div>
            </section>

            <section className="departments">
                <h2>Medical Specialties</h2>
                <div className="dept-slider">
                    <div className="dept-card">
                        <div className="dept-icon"><img src="/image/icons8-cardiology-64.png" alt="Cardiology" /></div>
                        <h4>Cardiology</h4>
                        <p>Heart & Cardiovascular Care</p>
                    </div>
                    <div className="dept-card">
                        <div className="dept-icon"><img src="/image/icons8-neurology-48.png" alt="Neurology" /></div>
                        <h4>Neurology</h4>
                        <p>Brain & Nervous System</p>
                    </div>
                    <div className="dept-card">
                        <div className="dept-icon"><img src="/image/icons8-orthopedic-64.png" alt="Orthopedics" /></div>
                        <h4>Orthopedics</h4>
                        <p>Bone & Joint Treatment</p>
                    </div>
                    <div className="dept-card">
                        <div className="dept-icon"><img src="/image/icons8-pediatrics-32.png" alt="Pediatrics" /></div>
                        <h4>Pediatrics</h4>
                        <p>Child Healthcare Services</p>
                    </div>
                </div>
            </section>

            <section className="doctors">
                <h2>Our Medical Experts</h2>
                <div className="doctor-grid">
                    <div className="doctor-card">
                        <div className="doctor-avatar"><img src="/image/icons8-doctor-60.png" alt="Dr. Rohan Singh" /></div>
                        <h4>Dr. Rohan Singh</h4>
                        <p>Senior Cardiologist</p>
                        <span className="experience">12+ Years Experience</span>
                    </div>
                    <div className="doctor-card">
                        <div className="doctor-avatar"><img src="/image/icons8-doctor-60.png" alt="Dr. Priya Sharma" /></div>
                        <h4>Dr. Priya Sharma</h4>
                        <p>Consultant Neurologist</p>
                        <span className="experience">8+ Years Experience</span>
                    </div>
                    <div className="doctor-card">
                        <div className="doctor-avatar"><img src="/image/icons8-doctor-60.png" alt="Dr. Aman Verma" /></div>
                        <h4>Dr. Aman Verma</h4>
                        <p>Orthopedic Surgeon</p>
                        <span className="experience">10+ Years Experience</span>
                    </div>
                </div>
            </section>

            <section className="contact">
                <h2>Contact Us</h2>
                <div className="contact-info">
                    <div className="contact-card">
                        <h4><img src="/image/icons8-address-50.png" alt="Address" /> Address</h4>
                        <p>CityCare Multispeciality Hospital<br/>
                        Raj Nagar, Ghaziabad<br/>
                        Uttar Pradesh, India</p>
                    </div>
                    <div className="contact-card">
                        <h4><img src="/image/icons8-phone-50.png" alt="Phone" /> Phone</h4>
                        <p>+91 7810023349<br/>
                        Emergency: +91-9876543211</p>
                    </div>
                    <div className="contact-card">
                        <h4><img src="/image/icons8-email-50.png" alt="Email" /> Email</h4>
                        <p>info@citycare.com<br/>
                        emergency@citycare.com</p>
                    </div>
                    <div className="contact-card">
                        <h4><img src="/image/icons8-last-24-hours-50.png" alt="Hours" /> Hours</h4>
                        <p>24/7 Emergency Services<br/>
                        OPD: 8:00 AM - 8:00 PM</p>
                    </div>
                </div>
            </section>

            <section className="about">
                <h2>About CityCare Hospital</h2>
                <div className="about-content">
                    <div className="about-stats">
                        <div className="stat-item">
                            <h3>250+</h3>
                            <p>Bed Capacity</p>
                        </div>
                        <div className="stat-item">
                            <h3>50+</h3>
                            <p>Expert Doctors</p>
                        </div>
                        <div className="stat-item">
                            <h3>15+</h3>
                            <p>Specialties</p>
                        </div>
                        <div className="stat-item">
                            <h3>24/7</h3>
                            <p>Emergency Care</p>
                        </div>
                    </div>
                    <p>CityCare Multispeciality Hospital stands as a premier healthcare institution in Raj Nagar, Ghaziabad, committed to delivering exceptional medical services with compassion and excellence. Our 250-bed facility houses state-of-the-art medical equipment and cutting-edge technology.</p>
                    <p>We pride ourselves on our multidisciplinary approach, featuring specialized departments including Cardiology, Neurology, Orthopedics, Pediatrics, and Emergency Medicine. Our team of board-certified physicians and healthcare professionals work collaboratively to ensure the highest standards of patient care and safety.</p>
                </div>
            </section>

        </div>
    );
};

export default Home;