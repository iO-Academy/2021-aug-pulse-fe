import React, {useState} from 'react';
import {DatePicker} from "@mui/lab";
import {FormControl, Container, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const DisplayAppointments = () => {
    const [value, setValue] = useState();

    return (
        <div>
            <Container maxWidth="sm">
                <h1>Create Appointment</h1>
                <FormControl fullWidth marginBottom={3}>
                    <InputLabel id="doctors">Select doctor...</InputLabel>
                    <Select
                        labelId="doctors"
                        id="ddDoctors"
                        // value={age}
                        // label="Age"
                        // onChange={handleChange}
                    >
                        <MenuItem value={10}>Dr. Seuss</MenuItem>
                        <MenuItem value={20}>Dr. Gandhi</MenuItem>
                        <MenuItem value={30}>Dr. Doolittle</MenuItem>
                    </Select>
                </FormControl>

                <div>
                    <DatePicker
                        label="Select a Date"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </div>
            </Container>
        </div>
    )
};

export default DisplayAppointments;