import React, {useState} from "react";
import {Button, Container, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";

const AppointmentConfirmation = () => {
    const location = useLocation()
    const {from} = location.state;
    // console.log(`[state1]: ${location.state.doctorId}`);
    // console.log(`[state2]: ${location.state.appointment['timeID']}`);

    const [appointment, setAppointment] = useState(location.state.appointment);

    async function addAppointment() {
        const response = await fetch(process.env.REACT_APP_API_SERVER_URL + '/appointments',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},
                body: JSON.stringify(appointment)
            });
        return await response.json();

        // console.log(`[appointment-JSON]: ${JSON.stringify(appointment)}`);
    }

    const addAppointmentHandler = () => {
        addAppointment()
            .then(() => {
                console.log(`[success]: Successful`);
            }).catch(error => {
                console.log(`[error]: ${error}`);
        })
    };

    return (
        <div>
            <Container>
                <h4>Appointment Overview</h4>
                <h6>please confirm your appointment</h6>
                <ListGroup className="">
                    <ListGroupItem>Doctor: {location.state.appointment['doctorID']}</ListGroupItem>
                    <ListGroupItem>Appointment Date: {location.state.appointment['date']}</ListGroupItem>
                    <ListGroupItem>Time Slot: {location.state.appointment['timeID']}</ListGroupItem>
                    <ListGroupItem>Patient: {location.state.appointment['patientFirstName']}
                        &nbsp;{location.state.appointment['patientLastName']}</ListGroupItem>
                    <ListGroupItem>Patient Email: {location.state.appointment['patientEmail']}</ListGroupItem>
                    <ListGroupItem>Notes: {location.state.appointment['notes']}</ListGroupItem>
                </ListGroup>
                {/*get all appointment selection data from previous pages, POST to database*/}
                <Link to="/appointments" className="btn btn-primary">Cancel</Link>
                <Button className="btn btn-primary" onClick={addAppointmentHandler}>Confirm</Button>
            </Container>

        </div>
    )
};

export default AppointmentConfirmation;