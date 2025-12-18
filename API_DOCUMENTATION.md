# Hospital Management System API Documentation

Base URL: `http://localhost:8000/api/v1`

## Authentication
- **POST** `/auth/signup` - Register new user
- **POST** `/auth/login` - User login
- **GET** `/auth/users` - Get all users

## Hospital Information
- **GET** `/hospital/hospital` - Get hospital information

## Doctors
- **GET** `/hospital/doctors` - Get all doctors
- **GET** `/hospital/doctors/:id` - Get doctor by ID
- **POST** `/hospital/doctors` - Create new doctor
- **PUT** `/hospital/doctors/:id` - Update doctor
- **DELETE** `/hospital/doctors/:id` - Delete doctor

## Patients
- **GET** `/hospital/patients` - Get all patients
- **GET** `/hospital/patients/:id` - Get patient by ID
- **POST** `/hospital/patients` - Create new patient
- **PUT** `/hospital/patients/:id` - Update patient
- **DELETE** `/hospital/patients/:id` - Delete patient

## Appointments
- **GET** `/hospital/appointments` - Get all appointments
- **POST** `/hospital/appointments` - Create new appointment

## Other Endpoints
- **GET** `/hospital/departments` - Get all departments
- **GET** `/hospital/pharmacy` - Get all medicines
- **GET** `/hospital/staff` - Get all staff members
- **GET** `/hospital/rooms` - Get all rooms

## Response Format
All responses follow this format:
```json
{
  "status": "success"/"fail",
  "data": {...} or "message": "error message",
  "token": "jwt_token" (for auth endpoints)
}
```

## Example Usage

### User Signup:
```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "doctor"
}
```

### User Login:
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create a new doctor:
```bash
POST /api/v1/hospital/doctors
Content-Type: application/json

{
  "id": "DOC106",
  "name": "Dr. John Doe",
  "specialization": "Cardiologist",
  "experience": "5 Years",
  "rating": 4.5,
  "available": true,
  "timing": "9 AM - 5 PM"
}
```