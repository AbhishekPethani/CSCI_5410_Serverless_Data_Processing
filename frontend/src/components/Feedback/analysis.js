import React from "react";
import { useNavigate } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PieChart from 'react-minimal-pie-chart';
import { getFeedbackAnalysis } from "../../Services/Apis"
import { useState, useEffect } from 'react';
import { VictoryPie } from "victory-pie";


const theme = createTheme();


function FeedbackAnalysis() {
    const navigate = useNavigate();

    const [positiveFeedback, setPositiveFeedback] = useState();
    const [negativeFeedback, setNegativeFeedback] = useState();
    const [data, setData] = useState([{}]);
    useEffect(() => {
        retrieveFeedbackAnalysis();
    }, []);



    const retrieveFeedbackAnalysis = async () => {
        getFeedbackAnalysis()
            .then(response => {
                console.log(response);
                setPositiveFeedback(parseInt(response.data.positive_feedback_prcnt));
                setNegativeFeedback(parseInt(response.data.negative_feedback_prcnt));
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="sm">

                {/* <PieChart FullOption
                    data={[
                        { title: 'Positive', value: 60, color: '#198754' },
                        { title: 'Negative', value: 40, color: '#df4759' },
                    ]}
                    label={(data) => (console.log(data['data']['title']))}
                />; */}
                <VictoryPie
                    data={[
                        { x: 'Positive', y: `${positiveFeedback}` },
                        { x: 'Negative', y: `${100-positiveFeedback}` },
                    ]}
                    colorScale={["green", "red"]}
                    radius={100}
                />
            </Container>


        </ThemeProvider>
    );
}

export default FeedbackAnalysis;
