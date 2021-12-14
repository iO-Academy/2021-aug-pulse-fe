import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import {Link} from "react-router-dom";

const AppointmentConfirmation = () => {

    return (
    <div>
        <Container>
            <h4>Appointment Overview</h4>
            <h6>please confirm your appointment</h6>
            {/*get all appointment selection data from previous pages, POST to database*/}
            <Link to="/appointments" className="btn btn-primary">Cancel</Link>
            <Link to="" className="btn btn-primary">Confirm</Link>


        </Container>
    </div>
    )
};

export default AppointmentConfirmation;