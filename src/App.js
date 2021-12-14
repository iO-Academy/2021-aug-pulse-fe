import './App.css';
import { Outlet, Link } from "react-router-dom";

function App() {
    return (
        <div className="container">
            <Link to="/appointments" className="btn btn-primary">Book Appointment</Link>
            {/*<Link to="/expenses">Expenses</Link>*/}
            <Outlet />
        </div>
    );
}

export default App;