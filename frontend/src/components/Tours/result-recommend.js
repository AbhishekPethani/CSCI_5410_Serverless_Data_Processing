import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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

const theme = createTheme();

const ResultRecommendTour = () => {

    const location = useLocation()
    const {duration} = location.state
    const [tours, setTours] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        retrieveMeals();
    }, []);

    const retrieveMeals = () => {
        getRecommendations(duration)
            .then(response => {
                console.log(response.data);
                setTours(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        // navigate("/security_que_ans", { state: { email: userInput.email } })
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h5" gutterBottom component="div">
                Food Menu
            </Typography>
            <Grid container spacing={4} sx={{ m: 2 }}>

                {/* {tours.map((meal) => (
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345, background: "#F9F4D9" }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="300"
                                image={meal.image_url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {meal.food_item}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Finger Lickin Good!!!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant='contained' color='success' onClick={() => navigate("/meals/" + meal.item_id + "/order")} size="small">Cant Wait! Order Now</Button>
                            </CardActions>
                        </Card>
                    </Grid>

                ))} */}

            </Grid>
        </ThemeProvider>
    )
}

export default ResultRecommendTour