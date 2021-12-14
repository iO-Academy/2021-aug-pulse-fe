import React from 'react';
import { ListGroup } from "react-bootstrap";

const AvailableAppointments = (props) => {

    return <div>
        <label>Select time slot from the following available slots:</label>
        <ListGroup defaultActiveKey="#link1">
            {props.appointments.map(slot =>
                <ListGroup.Item action href={`#link${slot.timeID}`} value={slot.timeID} onClick={event => {
                    let selectedSlotId = slot.timeID;
                    props.appointmentDateHandler(selectedSlotId);
                }
                }>{slot.timeID}
                </ListGroup.Item>
            )}
        < /ListGroup>
    </div>
};

export default AvailableAppointments;
