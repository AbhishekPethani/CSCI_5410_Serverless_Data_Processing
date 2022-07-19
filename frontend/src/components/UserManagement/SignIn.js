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
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import loginUser from '../../Services/authenticateSignIn';
import { useEffect } from 'react';

const theme = createTheme();

const SignIn = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })
  const [inputErrors, setInputErrors] = useState({});
  const [isUserSubmitted, setIsUserSubmitted] = useState(false);
  const navigate = useNavigate()

  const validateUserData = (userInput, securityKey) => {
    let errors = {}
    if (!userInput.email) {
      errors.email = "Email is required."
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userInput.email)) {
      errors.email = "Please enter valid email address."
    }
    if (!userInput.password) {
      errors.password = "Password is required."
    }
    return errors
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputErrors(validateUserData(userInput))
    setIsUserSubmitted(true)
  }

  useEffect(() => {
      async function login() {
        if (Object.keys(inputErrors).length === 0 && isUserSubmitted)  {
            // call method to authenticate user
            try{
              const result = await loginUser(userInput)    
              alert("Your ID and password is correct. Please provide answer to security question")
              navigate("/security_que_ans", { state: { email: userInput.email } })
            }catch(err){
              setIsUserSubmitted(false)
              console.log(err)
              let err_msg = ""
              if(err.code === "UserNotConfirmedException"){
                err_msg = "Your account is not verified. Please verify your account by clicking a verification link received on your registered email."
              }
              if(err.code === "NotAuthorizedException"){
                err_msg = "Incorrect username or password."
              }
              alert(err_msg)
            }
        }
      }
      login()
}, [userInput, inputErrors]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField margin="normal" required fullWidth id="email" label="User Email"
                  value={userInput.email} onChange={handleChange} name="email" autoFocus autoComplete='off' />
                {inputErrors.email && <p style={{ color: "red", margin: "auto" }}> {inputErrors.email}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField margin="normal" required fullWidth id="password" label="Password"
                  onChange={handleChange} value={userInput.password} name="password" type="password" autoComplete='off' />
                {inputErrors.password && <p style={{ color: "red", margin: "auto" }}> {inputErrors.password}</p>}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link href={"/sign-up"} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignIn