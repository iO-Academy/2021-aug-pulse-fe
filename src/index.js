import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import BookAppointments from "./components/BookAppointments";
import NewAppointmentForm from "./components/NewAppointmentForm";
import AppointmentConfirmation from "./components/AppointmentConfirmation";
import DoctorLoginPage from "./components/DoctorLoginPage";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="appointments" element={<BookAppointments/>}/>
                <Route path="newappointment" element={<NewAppointmentForm/>}/>
                <Route path="confirmappointment" element={<AppointmentConfirmation/>}/>
                <Route path="doctorlogin" element={<DoctorLoginPage/>}/>
                <Route
                    path="*"
                    element={
                        <main style={{padding: "1rem"}}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
