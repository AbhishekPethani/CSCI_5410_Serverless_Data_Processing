import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { getRoom } from "../../Services/Apis"
import { storeBookingInfo, sendMessage, getMessage } from "../../Services/Apis"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const theme = createTheme();

const BookRoom = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [userInput, setUserInput] = useState({
        bookingDate: '',
        checkoutDate: '',
    })

    const [room, setRoom] = useState([]);
    const [inputErrors, setInputErrors] = useState({});
    const [date, setDate] = useState({});

    useEffect(() => {
        retrieveRooms();
    }, [params.id]);


    const retrieveRooms = () => {
        getRoom(params.id)
            .then(response => {
                console.log(response.data);
                setRoom(response.data[0]);
                var date = maxDate(response.data);
                var formatted_date = formatDate(date);
                console.log(formatted_date);
                setDate(formatted_date)
            })
            .catch(e => {
                console.log(e);
            });
    };



    const maxDate = (data) => new Date(
        Math.max(
            ...data.map(element => {
                console.log(element);
                return new Date(element.checkoutDate);
            }),
        ),
    );

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });

    }

    const validateUserData = (userInput) => {
        let formIsValid = true;
        let errors = {}
        if (userInput.bookingDate == '') {
            formIsValid = false;
            errors.bookingDate = "Booking Date is required";
        }
        if (userInput.checkoutDate == '') {
            formIsValid = false;
            errors.checkoutDate = "Checkout Date is required";
        }
        setInputErrors(errors);
        return formIsValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //STORE USER INFORMATION

        console.log("SUbmitted form");
        if (validateUserData(userInput)) {
            var data = {
                room_id: room.room_id,
                bookingDate: userInput.bookingDate,
                checkoutDate: userInput.checkoutDate,
                room_type: room.room_type,
                email: localStorage.getItem("email")
            };
            console.log(data);
            var response = await storeBookingInfo(data);
            const msg = response.data.message
            var finalMessage = '';

            const d = new Date().toLocaleString();
        
            console.log(d)
    
            finalMessage = `${d}, Your room ${data.room_id} is booked from ${data.bookingDate} to ${data.checkoutDate}.`
            console.log("Lambda reponse: ", finalMessage);

            const messageInfo = {
                topicPath: "projects/sdpproject-355718/topics/roomBooking",
                userId: "dv@gmail.com",
                pubsubMessage: finalMessage
            }
            const res = await sendMessage(messageInfo)
            console.log("cloud function: ", res)

            // navigate("/security_que_ans", {state: {email: userInput.email}})
            console.log(response);
            navigate("/feedback")
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
                    <label>
                        Room Type
                    </label>
                    <TextField
                        fullWidth
                        name="room_type"
                        value={room.room_type}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={8}>
                    <label>
                        Price (1 Room)
                    </label>
                    <TextField
                        fullWidth
                        name="price"
                        aria-readonly={true}
                        value="500.25"  //Cost of one Room
                    />
                </Grid>


                <Grid item xs={8}>
                    <label>
                        Booking Date
                    </label>
                    <TextField
                        fullWidth
                        name="bookingDate"
                        value={userInput.bookingDate}
                        type="date"
                        inputProps={{ min: date, max: "2030-05-31" }}
                        aria-readonly={true}
                        onChange={handleChange}
                        error={inputErrors.bookingDate}
                    />
                    {inputErrors.bookingDate && <p style={{ color: "red", margin: "auto" }}> {inputErrors.bookingDate}</p>}
                </Grid>

                <Grid item xs={8}>
                    <label>
                        Checkout Date
                    </label>
                    <TextField
                        fullWidth
                        name="checkoutDate"
                        type="date"
                        value={userInput.checkoutDate}
                        inputProps={{ min: date, max: "2030-05-31" }}
                        aria-readonly={true}
                        onChange={handleChange}
                        error={inputErrors.checkoutDate}
                    />
                    {inputErrors.checkoutDate && <p style={{ color: "red", margin: "auto" }}> {inputErrors.checkoutDate}</p>}
                </Grid>
                <Grid item xs={8}>
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} > Submit </Button>
                </Grid>
            </Grid>

        </ThemeProvider >
    )
}

export default BookRoom