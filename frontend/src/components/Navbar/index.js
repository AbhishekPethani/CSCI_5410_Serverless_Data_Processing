import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Notification from "../Notification";
import { isLoggedIn } from "../../utils/utility";


function Navbar() {
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(true);
  };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setInvisible(false);
  }, [notifications]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [value, setValue] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar sx={{ background: "#063970" }} position="static">
      <Toolbar>
        <Typography variant="h5">B&B Application</Typography>

        <Tabs
          sx={{ marginLeft: "15px" }}
          indicatorColor="secondary"
          textColor="inherit"
          value={value}
          onChange={(e, value) => setValue(value)}
        >
          <Tab label="Tours" onClick={() => navigate("/tours")} />
          <Tab label="Meals" onClick={() => navigate("/meals")} />
          <Tab label="Rooms" onClick={() => navigate("/rooms")} />
          <Tab label="Feedback" onClick={() => navigate("/feedback")} />
          <Tab label="Feedback Analysis" onClick={() => navigate("/feedback-analysis")} />
          <Tab label="Report" onClick={() => navigate("/visualization")} />
        </Tabs>
        {isLoggedIn() ?
          <Box sx={{ flexGrow: 0 }} style={{ display: 'block', marginLeft: 'auto', marginRight: 250 }}>
            <Tooltip title="Notifications">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge variant="dot" invisible={invisible} color="secondary">
                  <Button checked={!invisible} onClick={handleBadgeVisibility}>
                    <MailIcon />
                  </Button>
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Notification
                notifications={notifications}
                setNotifications={setNotifications}
              />
            </Menu>
          </Box>
          : ""}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
