import React from 'react';
import {ListGroup} from "react-bootstrap";

const AvailableAppointments = (props) => {
    return <div>
        <label>Select time slot from the following available slots:</label>
        <ListGroup defaultActiveKey="#link1">
            {props.appointments.map(slot =>
                <ListGroup.Item action href={`#link${slot.id}`} key={slot.id}>{slot.slot}</ListGroup.Item>
                // <ListGroup.Item action key={slot.id}>{slot.slot}</ListGroup.Item>
            )}
        < /ListGroup>
    </div>
};

export default AvailableAppointments;
