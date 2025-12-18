const axios = require('axios');

const API_URL = 'http://localhost:8000/api/v1';

// Sample data for each collection
const sampleData = {
    patient: {
        name: 'Test Patient',
        age: 35,
        gender: 'Male',
        phone: '+91-9999999999',
        address: 'Test Address, Delhi',
        bloodGroup: 'O+',
        admitted: false,
        visitDate: '2024-01-20'
    },
    doctor: {
        name: 'Dr. Test Doctor',
        specialization: 'General Medicine',
        experience: '10 years',
        rating: 4.5,
        available: true,
        timing: '9:00 AM - 5:00 PM'
    },
    appointment: {
        patientId: null, // Will be set after patient creation
        doctorId: null,  // Will be set after doctor creation
        date: '2024-01-25',
        time: '10:00 AM',
        status: 'Scheduled'
    },
    staff: {
        name: 'Test Staff',
        role: 'Nurse',
        department: 'General',
        shift: 'Day',
        phone: '+91-8888888888',
        salary: 30000,
        status: 'Active'
    },
    pharmacy: {
        name: 'Test Medicine',
        type: 'Tablet',
        stock: 100,
        price: 50,
        manufacturer: 'Test Pharma',
        expiryDate: '2025-12-31'
    },
    room: {
        roomNumber: 'TEST-001',
        bedNumber: 'B-TEST-001',
        type: 'General',
        capacity: 2,
        occupied: false,
        status: 'Available',
        dailyRate: 2000,
        equipment: 'Basic Care Equipment'
    },
    surgery: {
        patientId: null, // Will be set after patient creation
        surgeonId: null, // Will be set after doctor creation
        surgeryType: 'Test Surgery',
        date: '2024-01-30',
        time: '11:00 AM',
        duration: '2 hours',
        status: 'Scheduled',
        operatingRoom: 'OR-1',
        anesthesiaType: 'General',
        priority: 'Routine',
        notes: 'Test surgery notes',
        cost: 50000,
        insurance: 'Yes',
        bloodType: 'O+',
        allergies: 'None'
    }
};

async function addSampleData() {
    try {
        console.log('Starting to add sample data...\n');

        // 1. Add Patient
        console.log('Adding patient...');
        const patientRes = await axios.post(`${API_URL}/patients/patient`, sampleData.patient);
        const patientId = patientRes.data.data._id;
        console.log('✓ Patient added:', patientId);

        // 2. Add Doctor
        console.log('Adding doctor...');
        const doctorRes = await axios.post(`${API_URL}/doctors/doctor`, sampleData.doctor);
        const doctorId = doctorRes.data.data._id;
        console.log('✓ Doctor added:', doctorId);

        // 3. Add Appointment (with patient and doctor IDs)
        console.log('Adding appointment...');
        sampleData.appointment.patientId = patientId;
        sampleData.appointment.doctorId = doctorId;
        const appointmentRes = await axios.post(`${API_URL}/appointments/appointment`, sampleData.appointment);
        console.log('✓ Appointment added:', appointmentRes.data.data._id);

        // 4. Add Staff
        console.log('Adding staff...');
        const staffRes = await axios.post(`${API_URL}/staff/staff`, sampleData.staff);
        console.log('✓ Staff added:', staffRes.data.data._id);

        // 5. Add Pharmacy
        console.log('Adding pharmacy item...');
        const pharmacyRes = await axios.post(`${API_URL}/pharmacy/pharmacy`, sampleData.pharmacy);
        console.log('✓ Pharmacy item added:', pharmacyRes.data.data._id);

        // 6. Add Room
        console.log('Adding room...');
        const roomRes = await axios.post(`${API_URL}/rooms/room`, sampleData.room);
        console.log('✓ Room added:', roomRes.data.data._id);

        // 7. Add Surgery (with patient and surgeon IDs)
        console.log('Adding surgery...');
        sampleData.surgery.patientId = patientId;
        sampleData.surgery.surgeonId = doctorId;
        const surgeryRes = await axios.post(`${API_URL}/surgeries/surgery`, sampleData.surgery);
        console.log('✓ Surgery added:', surgeryRes.data.data._id);

        console.log('\n✅ All sample data added successfully!');
        console.log('\nYou can now check:');
        console.log('- MongoDB database for the data');
        console.log('- Frontend pages to see the data displayed');
        console.log('- Dashboard for updated statistics');

    } catch (error) {
        console.error('❌ Error adding sample data:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

// Run the script
addSampleData();
