import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { storeFeedback } from '../../Services/Apis';
import { useNavigate } from "react-router-dom";


const theme = createTheme();

const Feedback = () => {
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        service: '',
        feedback: '',
    })

    const [inputErrors, setInputErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    const validateUserData = (userInput) => {
        let errors = {}
        if (userInput.service == '') {
            errors.service = "Please select a service";
        }
        if (!userInput.feedback) {
            errors.service = "Please enter feedback";
        }
        return errors
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setInputErrors(validateUserData(userInput))

        var data = {
            service: userInput.service,
            feedback: userInput.feedback,
        };

        var response = await storeFeedback(data);
        console.log(response);

        console.log("SUbmitted Feedback");
        navigate("/") //Change when everything performed
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h5" gutterBottom component="div">
                Please fill out the feedback form
            </Typography>
            <Grid component="form" alignItems="center"
                justifyContent="center" container spacing={2} onSubmit={handleSubmit}>
                <Grid item xs={8}>
                    <label>
                        Select Service
                    </label>

                    <Select fullWidth

                        id="demo-simple-select"
                        name='service'
                        value={userInput.service}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value="food">Food</MenuItem>
                        <MenuItem value="tour">Tour</MenuItem>
                        <MenuItem value="rooms">Rooms</MenuItem>
                    </Select>
                    {inputErrors.service && <p style={{ color: "red", margin: "auto" }}> {inputErrors.service}</p>}
                </Grid>
                <Grid item xs={8}>
                    <label>
                        Feedback
                    </label>

                    <TextField margin="normal" required fullWidth id="email" label="Feedback"
                        value={userInput.feedback} onChange={handleChange} name="feedback" autoFocus autoComplete='off' />
                    {inputErrors.feedback && <p style={{ color: "red", margin: "auto" }}> {inputErrors.feedback}</p>}
                </Grid>

                <Grid item xs={8}>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
                </Grid>
            </Grid>

        </ThemeProvider >
    )
}

export default Feedback