import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Tabs, Tab, useTheme } from "@mui/material";

function Navbar() {

    const [value, setValue] = useState(0);
    const theme = useTheme();
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
                    <Tab label="Tours" />
                    <Tab label="Some" />
                    <Tab label="Thing" />

                </Tabs>

            </Toolbar>
        </AppBar>
    );
}
export default Navbar;
