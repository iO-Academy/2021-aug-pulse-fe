import React from "react";
import { Card, Button, Container, Form } from "react-bootstrap";


const DoctorLoginPage = () => {

    return (
        <div>
            <h2>GP Portal</h2>
            <h3>Please Login</h3>
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="name" placeholder="*******" />
                    </Form.Group>
                </Form>
                <Button>Login</Button>
                <Button>Home</Button>
                {/*use the below format instead ^ Buttons temporary. */}
                {/*<Link to="/confirmappointment" className="btn btn-primary">Confirm</Link>*/}
                {/*<Link to="/appointments" className="btn btn-primary">Back</Link>*/}


            </div>
        </div>
    )
};

export default DoctorLoginPage;