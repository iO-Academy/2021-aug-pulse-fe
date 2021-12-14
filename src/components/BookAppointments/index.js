import React, {useEffect, useState} from 'react';
import {Button, Container, DropdownButton, Dropdown, Form} from "react-bootstrap";
import AvailableAppointments from "../AvailableAppointments";
import {Link, useSearchParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DUMMY_SLOTS = [
    {
        id: '8',
        slot: '8:00 am'
    },
    {
        id: '9',
        slot: '9:00 am'
    },
    {
        id: '10',
        slot: '10:00 am'
    },
    {
        id: '11',
        slot: '11:00 am'
    },
    {
        id: '12',
        slot: '12:00 pm'
    }
];

const BookAppointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointmentDoctor, setAppointmentDoctor] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentSlot, setAppointmentSlot] = useState();
    const [appointments, setAppointments] = useState([]);
    const [appointmentParams, setAppointmentParams] = useSearchParams();

    async function getDoctors() {
        const response = await fetch('http://localhost:3001/doctors');
        return await response.json();
    }

    async function getBookedAppointments() {
        const response = await fetch(`http://localhost:3001/appointments?doctorid=1&appdate=25012021`);
        return await response.json();
    }

    useEffect(() => {
        getDoctors().then(data => setDoctors(data));
    }, [])

    const getAppointmentsHandler = (event) => {
        event.preventDefault();
        getBookedAppointments().then(data => setAppointments(data));
    };

    const setAppointmentSlotHandler = (appointmentSlotId) => {
        setAppointmentSlot(appointmentSlotId);
    };

    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const str = day.toString() + month.toString() + year.toString();
        console.log(str);
        return str;
    }

    return (
        <Container>
            <Form onSubmit={getAppointmentsHandler}>
                <h2>Book Appointment</h2>
                <Form.Group className="mb-3" controlId="form.doctorDropdown">
                    <Form.Select aria-label="Select Doctor" onChange={(event) =>
                        setAppointmentDoctor(event.target.value)}>
                        <option>Select doctor...</option>
                        {doctors.map(doctor =>
                            <option
                                value={doctor.doctorID}>Dr. {doctor.doctorFirstName} {doctor.doctorLastName}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form.calendar">
                    <DatePicker selected={appointmentDate}
                                onChange={(date) => setAppointmentDate(date)}/>
                </Form.Group>
                <Button type="submit">Show available time slots</Button>
            </Form>

            <AvailableAppointments appointments={appointments}
                                   appointmentDateHandler={setAppointmentSlotHandler}/>
            <Link
                to={`/newappointment?doctorId=${appointmentDoctor}&slot=${appointmentSlot}&appdate=${formatDate(appointmentDate)}`}
                className="btn btn-primary">Continue</Link>

        </Container>
    )
};

export default BookAppointments;