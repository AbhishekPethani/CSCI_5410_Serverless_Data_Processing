import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const theme = createTheme();

const AuthSecurityQueAns = () => {
    const location = useLocation()
    const {email} = location.state
    const [answer, setAnswer] = useState()
    const [answerError, setAnswerError] = useState('');
    const [questionAnswer, setQuestionAnswer]  = useState({
      question: '', 
      answer:''
    })
    const [isUserSubmitted, setIsUserSubmitted] = useState(false);
    const navigate = useNavigate()

    const validateAnswer = (answer) => {
        let error = ""
        if(!answer){
            error = "Answer is required"
        }
        return error
    }

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setAnswerError(validateAnswer(answer))
        setIsUserSubmitted(true)
    }
    useEffect(()=> {
      if (answerError.length === 0 && isUserSubmitted)  {
        // call method to add user in user pool
        if(questionAnswer.answer === answer){
          alert("Your security question answer is verified. Please decrypt the given Encoded text!")
          navigate("/caesar_cipher", {state: {email: email}})
        }
        else{
          setIsUserSubmitted(false)
          setAnswerError("Answer does not match!!")
        }
      }
    }, [answer, answerError, isUserSubmitted])

    useEffect(()=> {
      const URL = "https://us-east1-serverless-final-project-15.cloudfunctions.net/auth_user_ques_ans?email="
                   + email +"&task=READ"
      axios.get(URL)
      .then((response) => {
          setQuestionAnswer({
            question: response.data.question,
            answer: response.data.answer
          })
        })
      .catch((error) => {
          console.log(error)
      })
    }, [])

    return (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Security Question Answer
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    {questionAnswer.question && <h4>{questionAnswer.question}</h4>}
                      <TextField size='small' autoComplete='off' name="answer" value={answer} 
                            onChange={e => handleAnswerChange(e)} required fullWidth id="answer"/>
                      {answerError && <p style={{color:"red", margin:"auto"}}> {answerError}</p>}
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Authenticate </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
    )
}

export default AuthSecurityQueAns