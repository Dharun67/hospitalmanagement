const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const doctorsAPI = {
  getAll: () => apiCall('/doctors/'),
  create: (doctor) => apiCall('/doctors/doctor', {
    method: 'POST',
    body: JSON.stringify(doctor),
  }),
};

export const patientsAPI = {
  getAll: () => apiCall('/patients/'),
  create: (patient) => apiCall('/patients/patient', {
    method: 'POST',
    body: JSON.stringify(patient),
  }),
};

export const appointmentsAPI = {
  getAll: () => apiCall('/appointments/'),
  create: (appointment) => apiCall('/appointments/appointment', {
    method: 'POST',
    body: JSON.stringify(appointment),
  }),
};

export const pharmacyAPI = {
  getAll: () => apiCall('/pharmacy/'),
  create: (medicine) => apiCall('/pharmacy/medicine', {
    method: 'POST',
    body: JSON.stringify(medicine),
  }),
};