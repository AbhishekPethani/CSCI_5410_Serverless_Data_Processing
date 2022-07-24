import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const RecommendTour = () => {
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        name: '',
        duration: '',
    })

    const [inputErrors, setInputErrors] = useState({});
    const [cost, setCost] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
        console.log(e.target.name);
        if (e.target.value != undefined && e.target.name == "duration") {
            calculateCost(e.target.value)
        }
    }

    const calculateCost = (duration) => {
        const newCost = parseInt(duration) * parseFloat(500.25)    //Cost of the Room
        setCost(newCost)
    }

    const validateUserData = (userInput) => {
        let errors = {}
        let formIsValid = true;
        if (!userInput.duration) {
            formIsValid = false;
            errors.duration = "Duration period is required";
        }
        if (!userInput.people) {
            formIsValid = false;
            errors.people = "Number of People are required";
        }

        setInputErrors(errors);
        return formIsValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //API CALL TO PUB SUB AND STORE USER INFORMATION

        if (validateUserData(userInput)) {
            var data = {
                duration: userInput.duration,
                people: userInput.people,

            };
            console.log(data);

            localStorage.setItem("duration",data.duration)
            // Recommend Tours Api
            navigate("/recommended-tours-result", { state: { duration: data.duration } })
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h5" gutterBottom component="div">
                Book Tour Form
            </Typography>
            <Grid component="form" alignItems="center"
                justifyContent="center" container spacing={2} onSubmit={handleSubmit}>

                <Grid item xs={8}>

                    <TextField
                        fullWidth
                        name="duration"
                        type={"number"}
                        label="Enter number of days for stay"
                        value={userInput.duration}
                        onChange={handleChange}
                        error={inputErrors.duration}
                    />
                    {inputErrors.duration && <p style={{ color: "red", margin: "auto" }}> {inputErrors.duration}</p>}
                </Grid>

                <Grid item xs={8}>

                    <TextField
                        fullWidth
                        name="people"
                        label="Enter number of people"
                        type={"number"}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        value={userInput.people}
                        onChange={handleChange}
                        error={inputErrors.people}
                    />
                    {inputErrors.people && <p style={{ color: "red", margin: "auto" }}> {inputErrors.people}</p>}
                </Grid>


                <Grid item xs={8}>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
                </Grid>
            </Grid>

        </ThemeProvider >
    )
}

export default RecommendTour