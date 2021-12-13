import React, {useState} from 'react';
import {DatePicker} from "@mui/lab";
import {TextField} from "@mui/material";

const DisplayAppointments = () => {
    const [value, setValue] = useState();

    return (
        <div>
            <h1>Create Appointment</h1>
            <select id="doctors">
                <option value="1">Dr. Seuss</option>
                <option value="2">Dr. Gandhi</option>
                <option value="3">Dr. Doolittle</option>
            </select>
            <div>
                <DatePicker
                    label="Select a Date"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </div>ç
        </div>
    )
};

export default DisplayAppointments;