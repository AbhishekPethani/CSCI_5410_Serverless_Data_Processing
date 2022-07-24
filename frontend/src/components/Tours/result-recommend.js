import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getRecommendations } from "../../Services/Apis"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { storeRecommendedTour } from '../../Services/Apis';
import { sendMessage } from "../../Services/Apis"


const theme = createTheme();

const ResultRecommendTour = () => {

    const location = useLocation()
    const { duration } = location.state
    const [tours, setTours] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const navigate = useNavigate()

    useEffect(() => {
        retrieveMeals();
        console.log(duration)
    }, []);

    const retrieveMeals = async () => {
        getRecommendations(localStorage.getItem("duration"))
            .then(response => {
                console.log(response.data);
                setTours(response.data);
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleBookTour = async (tour) => {

        var response = await storeRecommendedTour(tour);

        const d = new Date().toLocaleString();
        const finalMessage = `${d}, Your ${tour.tour_address} is booked and duration is ${duration} days.`
        // console.log("Lambda reponse: ", finalMessage);

        // const messageInfo = {
        //     topicPath: "projects/sdpproject-355718/topics/roomBooking",
        //     userId: localStorage.getItem("email"),
        //     pubsubMessage: finalMessage
        // }
        // const res = await sendMessage(messageInfo)

        console.log("SUbmitted form");
        navigate("/feedback")
    }

    if (isLoading) {
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h1" gutterBottom component="div">
                Loading ......
            </Typography>
        </ThemeProvider>
    }
    else {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Typography align="center" variant="h5" gutterBottom component="div">
                    Food Menu
                </Typography>
                <Grid container spacing={4} sx={{ m: 2 }}>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345, background: "#F9F4D9" }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="300"
                                image="https://catalogue.novascotia.com/ManagedMedia/26061.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {tours.package1.tour_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <b>Description: </b> {tours.package1.tour_description}
                                    <br />
                                    <b>Address: </b>{tours.package1.tour_address}
                                    <br />
                                    <b>Price:  </b>{tours.package1.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' color='success' onClick={() => handleBookTour(tours.package1)} size="small">Book Tour</Button>

                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345, background: "#F9F4D9" }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="300"
                                image="https://catalogue.novascotia.com/ManagedMedia/15595.jpg"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {tours.package2.tour_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <b>Description: </b> {tours.package2.tour_description}
                                    <br />
                                    <b>Address: </b>{tours.package2.tour_address}
                                    <br />
                                    <b>Price:  </b>{tours.package2.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' color='success' onClick={() => handleBookTour(tours.package2)} size="small">Book Tour</Button>

                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

            </ThemeProvider>
        )
    }
}

export default ResultRecommendTour