import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import SignUp from "./components/UserManagement/SignUp";
import SignIn from "./components/UserManagement/SignIn";
import AuthSecurityQueAns from "./components/UserManagement/AuthSecurityQueAns";
import CaesarCipher from "./components/UserManagement/CaesarCipher";

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
          <Route exact path="/security_que_ans" element={<AuthSecurityQueAns />} />
          <Route exact path="/caesar_cipher" element={<CaesarCipher />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;