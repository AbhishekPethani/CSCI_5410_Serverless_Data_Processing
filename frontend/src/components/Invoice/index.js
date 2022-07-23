import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { getMeals } from "../../Services/Apis"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";

const theme = createTheme();


const Invoice = () => {

    const [meals, setMeals] = useState([]);
    const [inputErrors, setInputErrors] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        retrieveMeals();
    }, []);

    const retrieveMeals = () => {
        getMeals()
            .then(response => {
                console.log(response.data);
                setMeals(response.data);
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

                <TableContainer component={Paper}>
                    <Table sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none"
                        }
                    }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Room Number</TableCell>
                                <TableCell align="left">Room Type</TableCell>
                                <TableCell align="left">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow
                                key="{room.room_id}"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    Hello
                                </TableCell>
                                <TableCell align="left">No</TableCell>
                                <TableCell align="left">

                                </TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </ThemeProvider>
    )
}

export default Invoice