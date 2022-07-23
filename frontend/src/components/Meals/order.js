import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getRoom } from "../../Services/Apis"
import { useParams } from "react-router-dom";
import { getMeal } from "../../Services/Apis"
import { storeOrder } from "../../Services/Apis"
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const OrderMeal = () => {
    const navigate = useNavigate()
    const params = useParams();

    const [userInput, setUserInput] = useState({
        bookingDate: '',
        checkoutDate: '',
    })

    const [meal, setMeal] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [inputErrors, setInputErrors] = useState({});

    useEffect(() => {
        retrieveRooms();
    }, [params.id]);

    const retrieveRooms = () => {
        console.log(params.id);
        getMeal(params.id)
            .then(response => {
                console.log(response.data[0]);
                setMeal(response.data[0]);
            })
            .catch(e => {
                console.log(e);
            });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
        console.log(e.target.name);
        if (e.target.value != undefined && e.target.name == "quantity") {
            calculateCost(e.target.value)
        }
    }

    const calculateCost = (quantity) => {
        const newCost = parseInt(quantity) * parseInt(meal.price)    //Cost of the Room
        setTotalCost(newCost)
    }

    const validateUserData = (userInput, securityKey) => {
        let formIsValid = true;
        let errors = {}
        if (!userInput.quantity) {
            formIsValid = false;
            errors.quantity = "Please enter quantity";
        }
        setInputErrors(errors);
        return formIsValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateUserData(userInput)) {
            var data = {
                foodItem: meal.food_item,
                price: meal.price,
                quantity: userInput.quantity,
                item_id: meal.item_id,
                totalCost: totalCost,
                email: localStorage.getItem("email")
            };
            console.log(data);
            var response = await storeOrder(data);
            console.log(response);

            console.log("SUbmitted form");
            navigate("/feedback")
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h5" gutterBottom component="div">
                I am Hungry Form
            </Typography>
            <Grid component="form" alignItems="center"
                justifyContent="center" container spacing={2} onSubmit={handleSubmit}>
                <Grid item xs={8}>
                    <label>
                        Food Item
                    </label>
                    <TextField
                        fullWidth
                        name="room_type"
                        value={meal.food_item}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={8}>
                    <label>
                        Price (CAD)
                    </label>
                    <TextField
                        fullWidth
                        name="price"
                        aria-readonly={true}
                        value={meal.price}
                    />
                </Grid>


                <Grid item xs={8}>
                    <label>
                        Quantity
                    </label>
                    <TextField
                        fullWidth
                        name="quantity"
                        value={userInput.quantity}
                        type="number"
                        aria-readonly={true}
                        onChange={handleChange}
                        error={inputErrors.quantity}
                    />
                    {inputErrors.quantity && <p style={{ color: "red", margin: "auto" }}> {inputErrors.quantity}</p>}
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        name="totalCost"
                        label="Total Cost (CAD)"
                        value={(totalCost)}
                        aria-readonly={true}
                        onChange={handleChange}
                        error={inputErrors.totalCost}
                    />
                </Grid>


                <Grid item xs={8}>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
                </Grid>
            </Grid>

        </ThemeProvider >
    )
}

export default OrderMeal