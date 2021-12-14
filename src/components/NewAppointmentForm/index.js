import React from 'react';
import { Form, Button } from "react-bootstrap";
import {Link} from "react-router-dom";


const NewAppointmentForm = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return (
        <div>
            <div>

                <h3>Patient Information</h3>
                <h5>please fill out your details below</h5>
                {/*form for patient information*/}
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" placeholder="patient" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="name" placeholder="patient-surname" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Symptoms</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Description of Symptoms" />
                    </Form.Group>
                </Form>
                <Link to="/confirmappointment" className="btn btn-primary">Confirm</Link>
                <Link to="/appointments" className="btn btn-primary">Back</Link>


            </div>
        </div>
    )
};

export default NewAppointmentForm;


