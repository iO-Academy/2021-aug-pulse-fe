import React, {useEffect, useState} from 'react';
import {Form, Button, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom'


const NewAppointmentForm = () => {
    const location = useLocation()
    const { from } = location.state;
    const [appointment, setAppointment] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setAppointment(prevState => ({
            ...prevState,
            "date": location.state.appointment['date'],
            "doctorID": location.state.appointment['doctorID'],
            "timeID": location.state.appointment['timeID']
        }));
    }, [])


    const formDataChangeHandler = (event) => {
        setAppointment(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
        console.log(appointment);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div>

                <h3>Patient Information</h3>
                <h5>please fill out your details below</h5>
                {/*form for patient information*/}
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="patientEmail" onChange={formDataChangeHandler} placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="name" name="patientFirstName" onChange={formDataChangeHandler} placeholder="patient" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="name" name="patientLastName" onChange={formDataChangeHandler} placeholder="patient-surname" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Symptoms</Form.Label>
                        <Form.Control as="textarea" rows={5} name="notes" onChange={formDataChangeHandler} placeholder="Description of Symptoms" />
                    </Form.Group>
                </Form>
                <Button onClick={handleShow}>Test Modal</Button>
                <Link
                    to={'/confirmappointment' }
                    state = {{ appointment }}
                    className="btn btn-primary">Confirm</Link>
                <Link to="/appointments" className="btn btn-primary">Back</Link>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
};

export default NewAppointmentForm;


