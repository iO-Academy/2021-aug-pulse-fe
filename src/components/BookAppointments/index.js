import React, {useEffect, useState} from 'react';
import {Button, Container, Form, Stack} from "react-bootstrap";
import AvailableAppointments from "../AvailableAppointments";
import {Link, useSearchParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookAppointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointmentDoctor, setAppointmentDoctor] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentSlot, setAppointmentSlot] = useState();
    const [appointments, setAppointments] = useState([]);
    const [appointmentParams, setAppointmentParams] = useSearchParams();
    const [appointment, setAppointment] = useState({
        doctorId: 3,
        slotId: 14,
        appDate: 24122021
    })

    /**
     * Creates required date format to pass in url params
     * @param date
     * @returns {string}
     */
    const formatDate = (date) => {
        const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        const dateString = new Date(date).toLocaleDateString('en-GB', options);
        return dateString.replaceAll('/', '');
    }

    async function getDoctors() {
        const response = await fetch(process.env.REACT_APP_API_SERVER_URL + '/doctors');
        return await response.json();
    }

    async function getBookedAppointments() {
        const response = await fetch(process.env.REACT_APP_API_SERVER_URL +
            `/appointments?doctorid=${appointmentDoctor}&appdate=${formatDate(appointmentDate)}`);
        return await response.json();
    }

    useEffect(() => {
        getDoctors().then(data => setDoctors(data));
    }, [])

    const calcAvailableAppointmentSlots = (data) => {
        const slots = [
            {id: 9, time: '09:00'}, {id: 10, time: '10:00'}, {id: 11, time: '11:00'},
            {id: 12, time: '12:00'}, {id: 13, time: '13:00'}, {id: 14, time: '14:00'},
            {id: 15, time: '15:00'}, {id: 16, time: '16:00'}];

        let slotsBooked = data.map(appointment => appointment.timeID);
        let slotsAvailable = slots.filter(slot => !slotsBooked.includes(slot.id))

        setAppointments(slotsAvailable);
    };

    const getAppointmentsHandler = (event) => {
        event.preventDefault();
        getBookedAppointments().then(data => calcAvailableAppointmentSlots(data));
    };

    const setAppointmentSlotHandler = (appointmentSlotId) => {
        setAppointmentSlot(appointmentSlotId);
        // setAppointment(doctorId)
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    return (
        <Container>
            <Form onSubmit={getAppointmentsHandler}>
                <h2>Book Appointment</h2>
                <Form.Group className="mb-3" controlId="form.doctorDropdown">
                    <Form.Select aria-label="Select Doctor" onChange={(event) =>
                        setAppointmentDoctor(event.target.value)}>
                        <option>Select doctor...</option>
                        {doctors.map(doctor =>
                            <option key={doctor.doctorID}
                                    value={doctor.doctorID}>Dr. {doctor.doctorFirstName} {doctor.doctorLastName}</option>
                        )}
                    </Form.Select>
                </Form.Group>
                <h6>Select Date:</h6>
                <Form.Group className="mb-3" controlId="form.calendar">
                    <DatePicker dateFormat="dd/MM/yyyy"
                                filterDate={isWeekday}
                                selected={appointmentDate}
                                onChange={(date) => setAppointmentDate(date)}/>
                    {/*<Form.Control type="date" name="appDate"*/}
                    {/*              onChange={(event) =>*/}
                    {/*                  setAppointmentDate(event.target.value)}/>*/}
                    <Button variant="primary" size="sm">Show available time slots</Button>
                </Form.Group>

            </Form>

            <AvailableAppointments appointments={appointments}
                                   appointmentDateHandler={setAppointmentSlotHandler}/>
             <Link
                to={`/newappointment?doctorId=${appointmentDoctor}&slot=${appointmentSlot}&appdate=${formatDate(appointmentDate)}`}
                // state = {{ from: appointment }}
                state = {{doctorId: 3, slotId: 14, appDate: 24122021}}
                className="btn btn-primary">Continue</Link>

        </Container>
    )
};

export default BookAppointments;