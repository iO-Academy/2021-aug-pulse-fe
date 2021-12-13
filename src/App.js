import './App.css';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DisplayAppointments from "./components/DisplayAppointments";

function App() {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DisplayAppointments/>
        </LocalizationProvider>
    );
}

export default App;
