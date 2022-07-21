import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Tabs, Tab, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const [value, setValue] = useState(0);
    const theme = useTheme();
    const navigate = useNavigate()

    return (
        <AppBar sx={{ background: "#063970" }} position="static">
            <Toolbar>
                <Typography variant="h5"
                >
                    B&B Application
                </Typography>

                <Tabs
                    sx={{ marginLeft: "15px" }}
                    indicatorColor="secondary"
                    textColor="inherit"
                    value={value}
                    onChange={(e, value) => setValue(value)}
                >
                    <Tab label="Tours" onClick={() => navigate("/tours")}/>
                    <Tab label="Meals" onClick={() => navigate("/meals")}/>
                    <Tab label="Rooms" onClick={() => navigate("/rooms")}/>
                    <Tab label="Feedback" onClick={() => navigate("/feedback")}/>
                    <Tab label="Feedback Analysis" onClick={() => navigate("/feedback-analysis")}/>

                </Tabs>

            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
