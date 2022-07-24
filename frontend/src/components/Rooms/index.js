import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import { getAllRooms } from "../../Services/Apis"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';


const theme = createTheme();

export default function Rooms() {

    const navigate = useNavigate()
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        retrieveRooms();
    }, []);

    const retrieveRooms = () => {
        getAllRooms()
            .then(response => {
                console.log(response.data);
                setRooms(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Typography align="center" variant="h5" gutterBottom component="div">
                Available Rooms
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Room Number</TableCell>
                            <TableCell align="left">Room Type</TableCell>
                            <TableCell align="left">Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms.map((room) => (
                            <TableRow
                                key={room.room_id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {room.room_id}
                                </TableCell>
                                <TableCell align="left">{room.room_type}</TableCell>
                                <TableCell align="left">
                                    <Button variant='contained' color='success' onClick={() => navigate("/rooms/" + room.room_id + "/book")} size="small">Book</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    );
}
