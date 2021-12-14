import React from 'react';
import {Button, Container, DropdownButton, Dropdown, Form} from "react-bootstrap";
import AvailableAppointments from "../AvailableAppointments";
import {Link} from "react-router-dom";

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
    return (
        <Container>
            <Form>
                <h2>Book Appointment</h2>
                <Form.Group className="mb-3" controlId="form.doctorDropdown">
                    <Form.Select aria-label="Select Doctor">
                        <option>Select doctor...</option>
                        <option value="1">Dr. Seuss</option>
                        <option value="2">Dr. Gandhi</option>
                        <option value="3">Dr. Doolittle</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="form.calendar">
                    <Form.Control type="date"/>
                </Form.Group>
                <Button>Show available time slots</Button>
            </Form>
            {/*<DropdownButton id="dropdown-basic-button" title="Dropdown button">*/}
            {/*    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>*/}
            {/*    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>*/}
            {/*    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
            {/*</DropdownButton>*/}
            <AvailableAppointments appointments={DUMMY_SLOTS}/>
            <Link to="/newappointment" className="btn btn-primary">Continue</Link>
        </Container>
    )
};

export default BookAppointments;