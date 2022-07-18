import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();


function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
  }, []);


  const token = localStorage.getItem("token");

  if (token == null) {
    navigate("/sign-in");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      "Hello From Dashboard"
    </ThemeProvider>
  );
}

export default Dashboard;
