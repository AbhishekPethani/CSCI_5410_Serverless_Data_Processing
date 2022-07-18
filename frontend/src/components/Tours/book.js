import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';


const theme = createTheme();

const BookTour = () => {
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

    const validateUserData = (userInput, securityKey) => {
        let errors = {}
        if (!userInput.duration) {
            errors.duration = "Duration period is required";
        }
        return errors
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputErrors(validateUserData(userInput))

        //API CALL TO PUB SUB AND STORE USER INFORMATION
        
        console.log("SUbmitted form");
        // navigate("/security_que_ans", {state: {email: userInput.email}})
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
                        name="destination"
                        label="Destination"
                        value={userInput.name}
                        onChange={handleChange}
                        error={inputErrors.name}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        name="price"
                        label="Price (1 Room)"
                        aria-readonly={true}
                        value="500.25"  //Cost of one Room
                    />
                </Grid>
                <Grid item xs={8}>

                    <TextField
                        fullWidth
                        name="duration"
                        label="Enter number of days for stay"
                        value={userInput.duration}
                        onChange={handleChange}
                        error={inputErrors.name}
                    />
                    {inputErrors.duration && <p style={{ color: "red", margin: "auto" }}> {inputErrors.duration}</p>}
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        name="cost"
                        label="Cost"
                        value={(cost)}
                        aria-readonly={true}
                        onChange={handleChange}
                        error={inputErrors.name}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
                </Grid>
            </Grid>

        </ThemeProvider >
    )
}

export default BookTour