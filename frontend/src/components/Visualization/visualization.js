import * as React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();


export default function Visuals() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="col-md-12">
                <div className="emdeb-responsive">
                    <h1>Booking Reports</h1>
                    <iframe width="1530" height="800" src="https://datastudio.google.com/embed/reporting/0c9cc6ea-d588-4768-b182-ba8a83648bf1/page/oGXyC"></iframe>
                    <h1>User Reports</h1>
                    <iframe width="1530" height="800" src="https://datastudio.google.com/embed/reporting/155e4241-f7c9-41d9-9ff6-7692b1cfc4b0/page/jeXyC"></iframe>
                </div>
            </div>
        </ThemeProvider>
    );
}
