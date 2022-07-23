import React from "react";
import { useNavigate } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { getFeedbackAnalysis } from "../../Services/Apis"
import { useState, useEffect } from 'react';
import { VictoryPie } from "victory-pie";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const theme = createTheme();


function FeedbackAnalysis() {
    const navigate = useNavigate();

    const [positiveFeedback, setPositiveFeedback] = useState();
    const [negativeFeedback, setNegativeFeedback] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        retrieveFeedbackAnalysis();
    }, []);



    const retrieveFeedbackAnalysis = async () => {
        getFeedbackAnalysis()
            .then(response => {
                console.log(response);
                setPositiveFeedback(parseInt(response.data.positive_feedback_prcnt));
                setNegativeFeedback(100 - (parseInt(response.data.positive_feedback_prcnt)));
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            });
    };

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
                <Container maxWidth="sm">

                    <Grid container spacing={3}>

                        <Grid item xs={6}>
                            <Box sx={{
                                border: '1px solid grey', bgcolor: 'red', width: 30,
                                height: 30
                            }}>

                            </Box>
                            <p>Negative Feedback: <strong>{100 - parseFloat(positiveFeedback)}</strong> %</p>
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{
                                border: '1px solid grey', bgcolor: 'green', width: 30,
                                height: 30
                            }}>

                            </Box>
                            <p>Positive Feedback: <strong>{parseFloat(positiveFeedback)}</strong> %</p>
                        </Grid>
                    </Grid>
                    <VictoryPie
                        data={[
                            { x: 'Positive', y: positiveFeedback },
                            { x: 'Negative', y: negativeFeedback },
                        ]}
                        colorScale={["green", "red"]}
                        radius={100}
                    />
                </Container>


            </ThemeProvider>
        );
    }
}

export default FeedbackAnalysis;
