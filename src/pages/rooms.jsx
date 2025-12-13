import { useOutletContext, Navigate } from 'react-router-dom';
import "../styles/dashboard.css";

const Rooms = () => {
    const { user } = useOutletContext();
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="all">
            <h1>Rooms/Wards</h1>
        </div>
    );
};

export default Rooms;