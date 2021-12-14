import './App.css';
import NewAppointmentForm from "./components/NewAppointmentForm";
import DisplayAppointments from "./components/DisplayAppointments";

function App() {
    return (
        <div>
            <DisplayAppointments/>
            <NewAppointmentForm/>
        </div>
    );
}

export default App;