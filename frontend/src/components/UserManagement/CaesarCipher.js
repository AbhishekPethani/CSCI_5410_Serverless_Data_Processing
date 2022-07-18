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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Api from "../../Services/Apis";
import { generateRandomString } from '../../utils/utility';


const theme = createTheme();

const CaesarCipher = () => {

    const generateCipherText = generateRandomString();
    const navigate = useNavigate()

    const [data, setData] = useState({
        decryption_key: "",
    })
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        //Call Api for Caesar Cipher function
        Api.caesar_cipher(data);

        setErrors(validateData(data))
        navigate("/dashboard")
    }

    const validateData = (data) => {
        let errors = {}

        if (!data.decryption_key) {
            errors.decryption_key = "Decryption Key is required"
        }
        // else if (data.decryption_key !== decryptedCipher) {
        //     errors.decryption_key = "Incorrect decrypted cipher text."
        // }
        return errors
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Caesar Cipher Decryption
                    </Typography>


                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <h3>
                                    Encoded Text: {generateCipherText}
                                </h3>
                            </Grid>
                            <Grid item xs={12}>
                                <p>Please use the security key entered during registration to decode the text</p>
                                <TextField
                                    required
                                    fullWidth
                                    id="decryption_key"
                                    label="Enter the Key"
                                    name="decryption_key"
                                    value={data.decryption_key}
                                    onChange={e => handleInputChange(e)}
                                />
                               {errors.decryption_key && <p style={{color:"red", margin:"auto"}}> {errors.decryption_key}</p>}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default CaesarCipher