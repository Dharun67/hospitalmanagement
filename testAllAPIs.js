const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = require('./index');

dotenv.config({ path: "./config.env" });

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("✅ DATABASE SUCCESSFULLY CONNECTED"))
  .catch(err => console.error("❌ Database connection failed:", err));

const testAllAPIs = async () => {
  try {
    console.log('\n🧪 TESTING ALL API ENDPOINTS\n');
    
    const server = app.listen(8001, () => {
      console.log('✅ Test server running on port 8001');
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));

    const baseURL = 'http://localhost:8001/api/v1';
    
    // Test all GET endpoints
    const endpoints = [
      '/doctors/',
      '/patients/', 
      '/appointments/',
      '/pharmacy/',
      '/rooms/',
      '/staff/'
    ];

    console.log('📋 TESTING GET ENDPOINTS:\n');
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${baseURL}${endpoint}`);
        const data = await response.json();
        
        if (response.ok && data.status === 'success') {
          console.log(`✅ GET ${endpoint} - Status: ${response.status} - Count: ${data.count}`);
        } else {
          console.log(`❌ GET ${endpoint} - Status: ${response.status} - Error: ${data.message}`);
        }
      } catch (error) {
        console.log(`❌ GET ${endpoint} - Network Error: ${error.message}`);
      }
    }

    console.log('\n📋 POSTMAN COLLECTION ENDPOINTS:\n');
    console.log('Base URL: http://localhost:8000/api/v1\n');
    
    console.log('🩺 DOCTORS:');
    console.log('GET    /doctors/');
    console.log('POST   /doctors/doctor');
    console.log('PUT    /doctors/doctor/:id');
    console.log('DELETE /doctors/doctor/:id\n');
    
    console.log('👥 PATIENTS:');
    console.log('GET    /patients/');
    console.log('POST   /patients/patient');
    console.log('PATCH  /patients/patient/:id');
    console.log('DELETE /patients/patient/:id\n');
    
    console.log('📅 APPOINTMENTS:');
    console.log('GET    /appointments/');
    console.log('POST   /appointments/appointment');
    console.log('PUT    /appointments/appointment/:id');
    console.log('DELETE /appointments/appointment/:id\n');
    
    console.log('💊 PHARMACY:');
    console.log('GET    /pharmacy/');
    console.log('POST   /pharmacy/medicine');
    console.log('PUT    /pharmacy/medicine/:id');
    console.log('DELETE /pharmacy/medicine/:id\n');
    
    console.log('🏠 ROOMS:');
    console.log('GET    /rooms/');
    console.log('POST   /rooms/room');
    console.log('PUT    /rooms/room/:id');
    console.log('DELETE /rooms/room/:id\n');
    
    console.log('👨‍💼 STAFF:');
    console.log('GET    /staff/');
    console.log('POST   /staff/staff');
    console.log('PUT    /staff/staff/:id');
    console.log('DELETE /staff/staff/:id\n');

    server.close();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error testing APIs:', error);
    process.exit(1);
  }
};

testAllAPIs();