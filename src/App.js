import './App.css';
import { Outlet, Link } from "react-router-dom";
import logo from "./assets/pulse-doctor-logo.svg";

function App() {
    return (
        <div className="container vh-100">
            <div className="d-flex flex-row me-2 justify-content-start align-items-center">
                <h1>Pulse</h1>
                <div className="d-flex justify-content-center align-items-center">
                    <h6 className="mt-4 ms-3">health in your hands</h6>
                </div>
            </div>
            <div>
                <Link to="/appointments" className="btn btn-primary me-2">Book Appointment</Link>
                <Link to="/doctorlogin" className="btn btn-primary">GP Portal</Link>
                <img src={logo} width="280" height="180" className="mt-2 mb-3"/>
            </div>
            <div>
            <Outlet />
        </div>
        </div>
    );
}

export default App;