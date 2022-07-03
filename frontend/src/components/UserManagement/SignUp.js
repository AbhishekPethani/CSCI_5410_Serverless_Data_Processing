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
import { InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';

const theme = createTheme();

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [inputErrors, setInputErrors] = useState({});
  const [isUserSubmitted, setIsUserSubmitted] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  const validateUserData = (userInput) => {
    let errors = {}
    if(!userInput.firstName.trim()){
      errors.firstName = "First Name is required."
    }else if(!/^[A-Za-z\s]*$/.test(userInput.firstName)){
      errors.firstName = "Please enter alphabets only."
    }

    if(!userInput.lastName.trim()){
      errors.lastName = "Last Name is required."
    }else if(!/^[A-Za-z\s]*$/.test(userInput.lastName)){
      errors.lastName = "Please enter alphabets only."
    }

    if(!userInput.email){
      errors.email = "Email is required."
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userInput.email)){
      errors.email = "Please enter valid email address."
    }

    if(!userInput.password){
      errors.password = "Password is required."
    }else if(!/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()])/.test(userInput.password)){
      errors.password = "Password must contains atleast one upper case letter, lower case letter, number and special character." 
    }else if(userInput.password.length < 8){
        errors.password = "Password must be eight character long."
    }

    if(!userInput.confirmPassword){
      errors.confirmPassword = "Confirm Password is required."
    }else if(userInput.password !== userInput.confirmPassword){
      errors.confirmPassword = "Password and Confirm password does not match."
    }

    return errors
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputErrors(validateUserData(userInput))
    setIsUserSubmitted(true)
  };
  
  useEffect(() => {
    if (Object.keys(inputErrors).length === 0 && isUserSubmitted)  {
        // call method to add user in user pool
    }
}, [userInput, inputErrors]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField size='small' autoComplete='off' name="firstName" value={userInput.firstName} 
                  onChange={handleChange} required fullWidth id="firstName" label="First Name" autoFocus />
                {inputErrors.firstName && <p style={{color:"red"}}> {inputErrors.firstName}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField size='small' required fullWidth id="lastName" label="Last Name" value={userInput.lastName} 
                  onChange={handleChange} name="lastName" autoComplete='off' />
                {inputErrors.lastName && <p style={{color:"red"}}> {inputErrors.lastName}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' required fullWidth id="email" label="Email Address" value={userInput.email} 
                  onChange={handleChange} name="email"autoComplete='off' />
                {inputErrors.email && <p style={{color:"red"}}> {inputErrors.email}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' required fullWidth name="password" label="Password" value={userInput.password} 
                  onChange={handleChange} type="password" id="password" autoComplete='off' />
                {inputErrors.password && <p style={{color:"red"}}> {inputErrors.password}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' required fullWidth name="confirmPassword" label="Confirm Password" value={userInput.confirmPassword} 
                  onChange={handleChange} type="password" id="confirmPassword" autoComplete='off' />
                {inputErrors.confirmPassword && <p style={{color:"red"}}> {inputErrors.confirmPassword}</p>}
              </Grid>            
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"> Already have an account? Sign in </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default SignUp