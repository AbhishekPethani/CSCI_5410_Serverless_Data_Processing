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
import { useState, useEffect } from 'react';
import SecurityQuestionsAnswers from './SecurityQuestionsAnswers';
import registerUser from '../../Services/addUsers';
import storeSecurityQuestionsAnswers from '../../Services/addSecurityQuestionAnswer'
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const SignUp = () => {
  const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [questionVals, setQuestionVals] = useState({"que_1": "", "que_2": "", "que_3": ""})
  const [answers, setAnswers] = useState({"ans1": "", "ans2": "", "ans3": ""})
  const [securityKey, setSecurityKey] = useState()
  
  const [inputErrors, setInputErrors] = useState({});
  const [isUserSubmitted, setIsUserSubmitted] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  const handleChangeSecurityKey = (e) => {
    setSecurityKey(e.target.value)
  }
  
  // function to chech input errors
  const validateUserData = (userInput, questionVals, answers, securityKey) => {
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

    if(!securityKey){
      errors.securityKey = "Security Key is required."
    }else if(!/^[0-9]+$/.test(securityKey) || securityKey > 26){
      errors.securityKey = "Security key must be a number and beween (1, 26)."
    }
    if(!questionVals.que_1){
      errors.que_1 = "Select the security question"
    }
    if(!questionVals.que_2){
      errors.que_2 = "Select the security question"
    }
    if(!questionVals.que_3){
      errors.que_3 = "Select the security question"
    }
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setInputErrors(validateUserData(userInput, questionVals, answers, securityKey))
    setIsUserSubmitted(true)
  };
  
  useEffect(() => {
    async function register() {
      if (Object.keys(inputErrors).length === 0 && isUserSubmitted)  {
          // call method to add user in user pool
          try{
            const result = await registerUser(userInput)
            alert("Your account is created. Please login to use our services.")
            console.log(result)
            storeSecurityQuestionsAnswers(userInput.email, questionVals, answers)
            localStorage.setItem("email", userInput.email);
            localStorage.setItem(userInput.email, securityKey);
            navigate("/signin")        
          }catch(err){
            setIsUserSubmitted(false)
            alert((err.message || JSON.stringify(err)) + " Please login to use our services.");
            console.log(err)
          }
        }
    }
    register()
}, [userInput, inputErrors, isUserSubmitted]);

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
            <Grid container spacing={2} padding={2}>
              <Grid item xs={12} sm={6}>
                <TextField size='small' autoComplete='off' name="firstName" value={userInput.firstName} 
                  onChange={handleChange} required fullWidth id="firstName" label="First Name" autoFocus />
                {inputErrors.firstName && <p style={{color:"red", margin:"auto"}}> {inputErrors.firstName}</p>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField size='small' required fullWidth id="lastName" label="Last Name" value={userInput.lastName} 
                  onChange={handleChange} name="lastName" autoComplete='off' />
                {inputErrors.lastName && <p style={{color:"red", margin:"auto"}}> {inputErrors.lastName}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' required fullWidth id="email" label="Email Address" value={userInput.email} 
                  onChange={handleChange} name="email"autoComplete='off' />
                {inputErrors.email && <p style={{color:"red", margin:"auto"}}> {inputErrors.email}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' required fullWidth name="password" label="Password" value={userInput.password} 
                  onChange={handleChange} type="password" id="password" autoComplete='off' />
                {inputErrors.password && <p style={{color:"red", margin:"auto"}}> {inputErrors.password}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField size='small' required fullWidth name="confirmPassword" label="Confirm Password" value={userInput.confirmPassword} 
                  onChange={handleChange} type="password" id="confirmPassword" autoComplete='off' />
                {inputErrors.confirmPassword && <p style={{color:"red", margin:"auto"}}> {inputErrors.confirmPassword}</p>}
              </Grid>            
              <SecurityQuestionsAnswers questionVals= {questionVals} setQuestionVals= {setQuestionVals} 
                  answers= {answers} setAnswers = {setAnswers} inputErrors={inputErrors} />
              <Grid item xs={12}>
                <TextField size='small' required fullWidth id="securitykey" label="Security Key" value={securityKey} 
                    onChange={handleChangeSecurityKey} name="securitykey" autoComplete='off' />
                {inputErrors.securityKey && <p style={{color:"red", margin:"auto"}}> {inputErrors.securityKey}</p>}
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign Up </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2"> Already have an account? Sign in </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default SignUp