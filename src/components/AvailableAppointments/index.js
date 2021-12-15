import React, {useEffect, useState} from 'react';
import {ListGroup} from "react-bootstrap";

const AvailableAppointments = (props) => {
    return <div className="mt-3">
        <label>Select time slot from the following available slots:</label>
        <ListGroup>
            {props.appointments.map(slot =>
                <ListGroup.Item action href={`#${slot.id}`} key={slot.id} onClick={event => {
                    props.appointmentDateHandler(slot.id);
                }
                }>{slot.time}
                </ListGroup.Item>
            )}
        < /ListGroup>
    </div>
};

export default AvailableAppointments;
