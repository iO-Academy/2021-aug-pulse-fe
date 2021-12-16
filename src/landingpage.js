import './App.css';
// import { Outlet, Link } from "react-router-dom";
import logo from './assets/pulse-doctor-logo.svg';


function LandingPage() {
    return (
        <div className="container d-flex flex-column me-2">
            <h1>Pulse</h1>
            <h6>health in your hands</h6>
            <img src={logo} width="250" height="150" className="mt-2 mb-3"/>
            <div>
            <a href="/appointments" className="btn btn-primary me-2">Book Appointment</a>
            <a href="/doctorlogin" className="btn btn-primary">GP Portal</a>
            {/*<Link to="/expenses">Expenses</Link>*/}
            </div>
        </div>
    );
}

export default LandingPage;