import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from './pages/dashboard.jsx';
import Patients from './pages/patients.jsx';
import Doctors from './pages/doctors.jsx';
import Appoinments from './pages/appoinments.jsx';
import OnlineConsultation from './pages/onlineConsultation.jsx';
import Employee from './pages/employee.jsx';  
import Pharmacy from './pages/pharmacy.jsx';
import Laboratory from './pages/laboratory.jsx';
import Surgeries from './pages/surgeries.jsx';
import Rooms from './pages/rooms.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';

const routerVariables = createBrowserRouter([{
    path: '/',
    element: <App/>,
    children: [
        {
        index: true,
        element: <Home />,
      },
        {
        path: "/login",
        element: <Login />,
      },
        {
        path: "/home",
        element: <Home />,
      },
        {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/patients/add",
        element: <Patients />,
      },
      {
        path: "/patients/details",
        element: <Patients />,
      },
      {
        path: "/patients/outpatients",
        element: <Patients />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/doctors/add",
        element: <Doctors />,
      },
      {
        path: "/doctors/manage",
        element: <Doctors />,
      },
      {
        path: "/doctors/details",
        element: <Doctors />,
      },
      {
        path: "/doctors/appointments",
        element: <Doctors />,
      },
      {
        path: "/appointments",
        element: <Appoinments />,
      },
      {
        path: "/appointments/book",
        element: <Appoinments />,
      },
      {
        path: "/appointments/manage",
        element: <Appoinments />,
      },
      {
        path: "/appointments/online-consultation",
        element: <OnlineConsultation />,
      },
      {
        path: "/appointments/online-consultation/book",
        element: <OnlineConsultation />,
      },
      {
        path :"/employee",
        element: <Employee/>,
      },
      {
        path :"/employee/staff/add",
        element: <Employee/>,
      },
      {
        path :"/employee/staff/manage",
        element: <Employee/>,
      },
      {
        path :"/employee/staff/details",
        element: <Employee/>,
      },
      {
        path :"/employee/worker/add",
        element: <Employee/>,
      },
      {
        path :"/employee/worker/manage",
        element: <Employee/>,
      },
      {
        path :"/employee/worker/details",
        element: <Employee/>,
      },
      {
        path :"/pharmacy",
        element:<Pharmacy/>
      },
      {
        path :"/pharmacy/add-stock",
        element:<Pharmacy/>
      },
      {
        path :"/pharmacy/bill-medicine",
        element:<Pharmacy/>
      },
      {
        path :"/pharmacy/medicine-details",
        element:<Pharmacy/>
      },
      {
        path :"/laboratory",
        element:<Laboratory/>
      },
      {
        path :"/laboratory/tests",
        element:<Laboratory/>
      },
      {
        path :"/laboratory/orders",
        element:<Laboratory/>
      },
      {
        path :"/laboratory/results",
        element:<Laboratory/>
      },
      {
        path :"/laboratory/reports",
        element:<Laboratory/>
      },
      {
        path :"/surgeries",
        element:<Surgeries/>
      },
      {
        path :"/surgeries/patient-details",
        element:<Surgeries/>
      },
      {
        path :"/surgeries/add",
        element:<Surgeries/>
      },
      {
        path :"/surgeries/reports",
        element:<Surgeries/>
      },
      {
        path :"/rooms",
        element:<Rooms/>
      },
      {
        path :"/rooms/icu-details",
        element:<Rooms/>
      },
      {
        path :"/rooms/emergency-ward",
        element:<Rooms/>
      },
      {
        path :"/rooms/general-ward",
        element:<Rooms/>
      }
    ]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routerVariables}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
