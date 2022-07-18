import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useState } from 'react';

const theme = createTheme();

const Tours = () => {
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    })
    const [inputErrors, setInputErrors] = useState({});
    const navigate = useNavigate()

    const validateUserData = (userInput, securityKey) => {
        let errors = {}
        if (!userInput.email) {
            errors.email = "Email is required."
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userInput.email)) {
            errors.email = "Please enter valid email address."
        }
        if (!userInput.password) {
            errors.password = "Password is required."
        }
        return errors
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setInputErrors(validateUserData(userInput))
        navigate("/security_que_ans", { state: { email: userInput.email } })
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Grid container spacing={12}>
                <Grid item xs={12} sx={{ m: 4 }}>
                    <Card sx={{ background: "#F9F4D9" }} >
                        <Grid container spacing={12}>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="250"
                                    image=""
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="250"
                                    image=""
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    alt="green iguana"
                                    height="250"
                                    image=""
                                />
                            </Grid>
                        </Grid>
                        <CardContent style={{ flex: "1" }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {/* ID */}
                            <Button variant='contained' color='success' onClick={() => navigate("/tours/" + 2 + "/book")} size="small">Book</Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>
        </ThemeProvider>
    )
}

export default Tours