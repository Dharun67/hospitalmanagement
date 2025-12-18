import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/header.jsx'
import './App.css'
import { useEffect, useState } from 'react';
import Pharmacy from './pages/pharmacy.jsx';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  let [data , setData] = useState({
    hospital: {},
    departments: [],
    doctors: [],
    patients: [],
    appointments: [],
    pharmacy: [],
    billing: [],
    rooms: [],
    staff: []
  });

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
          const response = await fetch("http://localhost:5173/hospital.json");
          const da = await response.json();
          setData(da);
          console.log(da);
      } 
      catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  fetchData();
}, [] );
console.log(data);
  return (
    <div className="App">
      {location.pathname !== '/login' && <Header user={user} onLogout={handleLogout} />}
      <Outlet context={{data, user, onLogin: handleLogin}}></Outlet>
    </div>
  )
}

export default App
