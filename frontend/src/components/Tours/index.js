import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getAllTours,storeTour } from '../../Services/Apis';
import { useState, useEffect } from "react";



const theme = createTheme();

const Tours = () => {

    const [tours, setTours] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        retrieveTours();
    }, []);

    const retrieveTours = () => {
        getAllTours()
            .then(response => {
                console.log(response.data);
                setTours(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleBookTour = async (tour) => {
        var data = {
            tour_id: tour.tour_id,
            price: tour.price,
            destination: tour.destination,
            duration: tour.duration,
            email: localStorage.getItem("email")
        };
        console.log(data);
        var response = await storeTour(data);
        console.log(response);

        console.log("SUbmitted form");
        navigate("/feedback")
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h5" gutterBottom component="div">
                Tours and Packages
            </Typography>
            <Grid container spacing={12}>
                <Grid item xs={12} sx={{ m: 2 }}>
                    <Box
                        mb={1}
                        //margin
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <Button sx={{ m: 2, alignContent: "right" }} variant='contained' color='success' onClick={() => navigate("/recommend-tour")} size="small">Recommend me the best tour</Button>
                    </Box>
                    {tours.map((tour) => (
                        <Card sx={{ m: 3, p: 2, background: "#F9F4D9" }} >
                            <Grid container spacing={12}>
                                <Grid item xs={4}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="250"
                                        image={tour.first_image_url}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="250"
                                        image={tour.second_image_url}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="250"
                                        image={tour.third_image_url}
                                    />
                                </Grid>
                            </Grid>
                            <CardContent style={{ flex: "1" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {tour.destination}
                                </Typography>
                                <Typography variant="body2" >
                                    Price : <strong>{tour.price}</strong> CAD<br />
                                    Duration : <strong> {tour.duration}</strong> Days
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' color='success' onClick={() => handleBookTour(tour)} size="small">Book</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>



            </Grid>
        </ThemeProvider>
    )
}

export default Tours