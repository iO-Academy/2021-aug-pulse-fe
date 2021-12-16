import React, {useEffect, useState} from 'react';
import {Button, Container, Form, OverlayTrigger, Stack, Tooltip} from "react-bootstrap";
import AvailableAppointments from "../AvailableAppointments";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BookAppointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState();
    const [appointments, setAppointments] = useState([]);
    const [appointment, setAppointment] = useState()
    const [disabledContinue, setDisabledContinue] = useState(true);
    const [disabledAppointments, setDisabledAppointments] = useState(true);

    let navigate = useNavigate();

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
            `/appointments?doctorid=${appointment['doctorID']}&appdate=${appointment['date']}`);
        return await response.json();
    }

    useEffect(() => {
        getDoctors().then(data => setDoctors(data));
    }, [])

    /**
     * Based on booked time slots, sets the available slots by filtering out the slots that
     * have been booked in a standard work hours.
     * @param data
     */
    const calcAvailableAppointmentSlots = (data) => {
        const slots = [
            {id: 9, time: '09:00'}, {id: 10, time: '10:00'}, {id: 11, time: '11:00'},
            {id: 12, time: '12:00'}, {id: 13, time: '13:00'}, {id: 14, time: '14:00'},
            {id: 15, time: '15:00'}, {id: 16, time: '16:00'}];

        let slotsBooked = data.map(appointment => appointment.timeID);
        let slotsAvailable = slots.filter(slot => !slotsBooked.includes(slot.id))

        setAppointments(slotsAvailable);
    };

    const setAppointmentHandler = (event) => {
        event.preventDefault();
        getBookedAppointments().then(data => calcAvailableAppointmentSlots(data));
    };

    const setAppointmentSlotHandler = (appointmentSlotId) => {
        setDisabledContinue(false);
        setAppointment(prevState => ({
            ...prevState,
            "timeID": appointmentSlotId
        }))
    };

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6;
    };

    return (
        <Container>
            <Form onSubmit={setAppointmentHandler}>
                <h2>Book Appointment</h2>
                <Form.Group className="mb-3" controlId="form.doctorDropdown">
                    <Form.Select aria-label="Select doctor..." onChange={(event) => {
                        setDisabledAppointments(false);
                        setAppointment(prevState => ({
                            ...prevState,
                            "doctorID": Number(event.target.value)
                        }))
                    }}
                    >
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
                                minDate={new Date()}
                                placeholderText="Click to select date..."
                                onSelect={(date) => {
                                    setAppointmentDate(date);   // only (re)populates the field
                                    setAppointment(prevState => ({
                                        ...prevState,
                                        "date": Number(formatDate(date))
                                    }))
                                }}/>
                    <Button type="submit" variant="primary" size="sm" className="mt-2" disabled={disabledAppointments}>Show
                        available time slots</Button>
                </Form.Group>

            </Form>

            <AvailableAppointments appointments={appointments}
                                   appointmentDateHandler={setAppointmentSlotHandler}/>
            {/*<Link*/}
            {/*    to={'/newappointment'}*/}
            {/*    state={{appointment}}*/}
            {/*    className="btn btn-primary" disabled="true">Continue</Link>*/}

            {/*<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Please select a doctor</Tooltip>}>*/}
            {/*    <span className="d-inline-block">*/}
            <Button className="btn btn-primary mt-2"
                    disabled={disabledContinue}
                    onClick={() => navigate("/newappointment", {state: {appointment}})}>Continue</Button>
            {/*    </span>*/}
            {/*</OverlayTrigger>*/}

        </Container>
    )
};

export default BookAppointments;