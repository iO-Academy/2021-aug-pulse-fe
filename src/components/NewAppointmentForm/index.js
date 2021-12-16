import React, {useEffect, useState} from 'react';
import {Form, Button, Modal, ListGroup, ListGroupItem, Container, Col, Row, InputGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from 'react-router-dom';


const NewAppointmentForm = () => {
    const location = useLocation()
    let from = location.state;
    const [appointment, setAppointment] = useState();
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);

    let navigate = useNavigate();

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
            [event.target.id]: event.target.value,
        }));
        location.state.appointment[event.target.id] = event.target.value;   // needed for modal
        console.log(appointment);
    };

    async function addAppointment() {
        const response = await fetch(process.env.REACT_APP_API_SERVER_URL + '/appointments',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},
                body: JSON.stringify(appointment)
            });
        return await response.json();
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const addAppointmentHandler = () => {
        handleClose();
        addAppointment()
            .then(() => {
                console.log(`[success]: Successful`);
                navigate('/appointments');
            }).catch(error => {
            console.log(`[error]: ${error}`);
        })
    };

    const handleConfirm = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            // event.stopPropagation();
        } else {
            handleShow();
        }
        setValidated(true);
    };

    return (
        <div className="container">
            <h3>Patient Information</h3>
            <h5>Please fill out your details below</h5>
            <Form noValidate validated={validated} onSubmit={handleConfirm}>
                <Row className="mb-2">
                    <Form.Group as={Col} md="4">
                        <Form.Control required type="text" id="patientFirstName" onChange={formDataChangeHandler}
                                      placeholder="First name"/>
                        <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Control required type="name" id="patientLastName" onChange={formDataChangeHandler}
                                      placeholder="Last name"/>
                        <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col} md="8">
                        <Form.Control required type="email" id="patientEmail" onChange={formDataChangeHandler}
                                      placeholder="Email address"/>
                        <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col} md="8">
                        <Form.Control required as="textarea" rows={5} id="notes" onChange={formDataChangeHandler}
                                      placeholder="Description of symptoms"/>
                        <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <div>
                    <Link to="/appointments" className="btn btn-primary">Back</Link>
                    <Button type="submit" className="mx-2">Confirm</Button>
                </div>

            </Form>

            {/*<Link*/}
            {/*    to={'/confirmappointment'}*/}
            {/*    state={{appointment}}*/}
            {/*    className="btn btn-primary">Confirm</Link>*/}


            <div>
                <Modal show={show} backdrop="static" size="lg" onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title><h4>Appointment Overview</h4>
                            <h6>Please confirm your appointment</h6></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <ListGroup className="">
                                <ListGroupItem>Doctor: {location.state.appointment['doctorID']}</ListGroupItem>
                                <ListGroupItem>Appointment
                                    Date: {location.state.appointment['date']}</ListGroupItem>
                                <ListGroupItem>Time Slot: {location.state.appointment['timeID']}</ListGroupItem>
                                <ListGroupItem>Patient: {location.state.appointment['patientFirstName']}
                                    &nbsp;{location.state.appointment['patientLastName']}</ListGroupItem>
                                <ListGroupItem>Patient
                                    Email: {location.state.appointment['patientEmail']}</ListGroupItem>
                                <ListGroupItem>Notes: {location.state.appointment['notes']}</ListGroupItem>
                            </ListGroup>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Back</Button>
                        <Link to="/appointments" className="btn btn-secondary">Cancel</Link>
                        <Button variant="primary" onClick={addAppointmentHandler}>Confirm</Button>
                    </Modal.Footer>
                </Modal>
            </div>


        </div>
    )
};

export default NewAppointmentForm;


