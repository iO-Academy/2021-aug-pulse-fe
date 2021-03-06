import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AvailableAppointments from "../AvailableAppointments";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calLogo from '../../assets/calendar-date-svgrepo-com.svg';


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
            {id: 9, time: '09:00 - 10:00'}, {id: 10, time: '10:00 - 11:00'}, {id: 11, time: '11:00 - 12:00'},
            {id: 12, time: '12:00 - 13:00'}, {id: 13, time: '13:00 - 14:00'}, {id: 14, time: '14:00 - 15:00'},
            {id: 15, time: '15:00 - 16:00'}, {id: 16, time: '16:00 - 17:00'}];

        let slotsBooked = data.map(appointment => appointment.timeID);
        let slotsAvailable = slots.filter(slot => !slotsBooked.includes(slot.id));

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
            <h2>Book Appointment</h2>
            <Form onSubmit={setAppointmentHandler}>
                <Row className="mb-2">
                    <Form.Group as={Col} xl={5} md={6} controlId="form.doctorDropdown">
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
                </Row>
                <Row className="mb-2">
                    <h6>Select Date:</h6>
                    <Form.Group as={Col} controlId="form.calendar">
                        <div className="d-flex mb-1">
                            <div className="align-self-center">
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
                            </div>
                            <div className="align-self-center mx-1">
                                <img src={calLogo} width="30" height="30"/>
                            </div>
                        </div>
                        <Button type="submit" variant="primary" size="sm" className="mt-2"
                                disabled={disabledAppointments}>Show
                            available time slots</Button>
                    </Form.Group>
                </Row>

            </Form>

            <AvailableAppointments appointments={appointments}
                                   appointmentDateHandler={setAppointmentSlotHandler}/>

            <Button className="btn btn-primary mt-2"
                    disabled={disabledContinue}
                    onClick={() => navigate("/newappointment", {state: {appointment}})}>Continue</Button>

        </Container>
    )
};

export default BookAppointments;