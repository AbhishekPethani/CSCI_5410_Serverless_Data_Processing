import { Typography } from "@mui/material";
import SignUp from "./components/UserManagement/SignUp";

function App() {
  return (
    <div className="App">
      <Typography align="center" variant="h4" gutterBottom component="div">
        Bed and Breakfast 
      </Typography>
      <SignUp />
    </div>
  );
}

export default App;