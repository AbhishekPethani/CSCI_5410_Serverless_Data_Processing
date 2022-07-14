import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const theme = createTheme();

const AuthSecurityQueAns = () => {
    const location = useLocation()
    const {email} = location.state
    const [answers, setAnswers] = useState({
        ans_1: "",
        ans_2: "",
        ans_3: ""
    })
    const [answerErrors, setAnswerErrors] = useState({});

    let question = ["What was your childhood nickname?", "What was your childhood nickname?", "In what city did you meet your spouse / significant other?"]
    const navigate = useNavigate()

    const validateAnswer = (answers) => {
        let errors = {}
        if(!answers.ans1){
            errors.ans1 = "Answer is required"
        }
        if(!answers.ans2){
            errors.ans2 = "Answer is required"
        }
        if(!answers.ans3){
            errors.ans3 = "Answer is required"
        }
        return errors
    }

    const handleAnswerChange = (e) => {
        const {name, value} = e.target;
        setAnswers({
          ...answers,
          [name]: value
        });
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setAnswerErrors(validateAnswer(answers))
        navigate("/caesar_cipher", {state: {email: email}})
    }

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Security Questions Answers
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    {question.map((que, index) => {
                        return (
                            <Grid item xs={12}>
                                <h4>{que}</h4>
                                <TextField size='small' autoComplete='off' name={"ans_" + (index+1)} value={answers[Object.keys(answers)[index]]} 
                                        onChange={e => handleAnswerChange(e)} required fullWidth id={"answer_" + (index+1)} />
                                {answerErrors[Object.keys(answerErrors)[index]] && <p style={{color:"red", margin:"auto"}}> {answerErrors[Object.keys(answerErrors)[index]]}</p>}
                            </Grid>
                        )
                    })}
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Authenticate </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
    )
}

export default AuthSecurityQueAns