import React, {useEffect, useState} from 'react';
import {Form, Button, Modal, ListGroup, ListGroupItem, Container, Col, Row} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from 'react-router-dom';


const NewAppointmentForm = () => {
    const location = useLocation()
    let from = location.state;
    const [appointment, setAppointment] = useState();
    const [show, setShow] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [validated, setValidated] = useState(false);
    const [doctors, setDoctors] = useState([]);

    let navigate = useNavigate();

    async function getDoctors() {
        const response = await fetch(process.env.REACT_APP_API_SERVER_URL + '/doctors');
        return await response.json();
    }

    useEffect(() => {
        getDoctors().then(data => setDoctors(data));

        setAppointment(prevState => ({
            ...prevState,
            "date": location.state.appointment['date'],
            "doctorID": location.state.appointment['doctorID'],
            "timeID": location.state.appointment['timeID']
        }));

    }, [])

    const displayDoctor = (id) => {
        const doctor = doctors.filter(x => x.doctorID === id)[0];
        return `Dr. ${doctor['doctorFirstName']} ${doctor['doctorLastName']}`;
    };

    const formDataChangeHandler = (event) => {
        setAppointment(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));

        // Re-injecting values is needed for modal (consider refactoring)
        location.state.appointment[event.target.id] = event.target.value;
        location.state.appointment['doctorFullName'] = displayDoctor(location.state.appointment['doctorID']);
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

    const handleShowFeedback = () => setShowFeedback(true);
    const handleCloseFeedback = () => {
        setShowFeedback(false);
        navigate('/appointments');
    }

    const addAppointmentHandler = () => {
        handleClose();
        addAppointment()
            .then(() => {
                handleClose();

                location.state.feedbackMessageTitle = 'Appointment Booked';
                location.state.feedbackMessage =
                    'You have successfully booked your appointment. You can safely dismiss this message.';
                handleShowFeedback();

            }).catch(error => {
                location.state.feedbackMessageTitle = 'Appointment Booking Failed';
                location.state.feedbackMessage =
                    'Something has gone wrong with booking your appointment. Please try again a bit later.';
                handleShowFeedback();
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
                        <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col} md="8">
                        <Form.Control required type="email" id="patientEmail" onChange={formDataChangeHandler}
                                      placeholder="Email address"/>
                        <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col} md="8">
                        <Form.Control required as="textarea" rows={5} id="notes" onChange={formDataChangeHandler}
                                      placeholder="Description of symptoms"/>
                        <Form.Control.Feedback type="invalid">Please provide details of your
                            symptoms.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <div>
                    <Link to="/appointments" className="btn btn-primary">Back</Link>
                    <Button type="submit" className="mx-2">Confirm</Button>
                </div>

            </Form>

            <div>
                <Modal show={show} backdrop="static" size="lg" onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title><h4>Appointment Overview</h4>
                            <h6>Please confirm your appointment</h6></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <ListGroup className="">
                                <ListGroupItem>Doctor: {location.state.appointment['doctorFullName']}
                                </ListGroupItem>
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
            <div>
                <Modal show={showFeedback} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>{location.state.feedbackMessageTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{location.state.feedbackMessage}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseFeedback}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
};

export default NewAppointmentForm;


