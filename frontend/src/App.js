import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import SignUp from "./components/UserManagement/SignUp";
import SignIn from "./components/UserManagement/SignIn";

function App() {
  return (
    <div className="App">
      <Typography align="center" variant="h4" gutterBottom component="div">
        Bed and Breakfast 
      </Typography>
      <Router>
        <Routes>
          <Route exact path="/" element={<SignUp />}  />
          <Route exact path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;